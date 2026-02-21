"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { WorkerMessage, WorkerResponse } from "../core/types";

type MessageHandler = (response: WorkerResponse) => void;

export function useWorker(workerFactory: () => Worker) {
  const [worker, setWorker] = useState<Worker | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const handlersRef = useRef<Map<string, MessageHandler>>(new Map());

  useEffect(() => {
    const newWorker = workerFactory();
    workerRef.current = newWorker;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWorker(newWorker);

    newWorker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const handlers = Array.from(handlersRef.current.values());
      handlers.forEach((handler) => handler(event.data));
    };

    return () => {
      newWorker.terminate();
    };
  }, [workerFactory]);

  const onMessage = useCallback((type: string, handler: MessageHandler) => {
    handlersRef.current.set(type, handler);
  }, []);

  const postMessage = useCallback(
    (message: WorkerMessage, transfer?: Transferable[]) => {
      if (workerRef.current) {
        if (transfer) {
          workerRef.current.postMessage(message, transfer);
        } else {
          workerRef.current.postMessage(message);
        }
      }
    },
    []
  );

  const terminate = useCallback(() => {
    workerRef.current?.terminate();
    const newWorker = workerFactory();
    workerRef.current = newWorker;
    setWorker(newWorker);
  }, [workerFactory]);

  return { worker, onMessage, postMessage, terminate };
}
