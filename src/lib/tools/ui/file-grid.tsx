import { X, MoveLeft, MoveRight, FileText, Image, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileItem } from "../core/types";
import { formatFileSize } from "@/lib/validation";
import { cn } from "@/lib/utils";

interface FileGridProps {
  files: FileItem[];
  onRemove?: (id: string) => void;
  onReorder?: (index: number, direction: "left" | "right") => void;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  renderItem?: (item: FileItem) => React.ReactNode;
}

export function FileGrid({
  files,
  onRemove,
  onReorder,
  selectedId,
  onSelect,
  renderItem,
}: FileGridProps) {
  if (files.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {files.map((item, index) => (
        <div
          key={item.id}
          onClick={() => onSelect?.(item.id)}
          className={cn(
            "relative group bg-card border rounded-lg p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all cursor-pointer",
            selectedId === item.id && "border-primary ring-1 ring-primary/20 bg-accent/20"
          )}
        >
          <div className="h-12 w-12 rounded flex items-center justify-center shrink-0 bg-primary/10 text-primary">
            {getFileIcon(item.type)}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-medium truncate text-sm" title={item.name}>
              {item.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(item.size)}
            </p>
          </div>

          {onReorder && (
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-muted-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  onReorder(index, "left");
                }}
                disabled={index === 0}
              >
                <MoveLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-muted-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  onReorder(index, "right");
                }}
                disabled={index === files.length - 1}
              >
                <MoveRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {onRemove && (
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(item.id);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}

          <div className="absolute top-2 left-2 flex items-center justify-center h-5 w-5 rounded-full bg-black/60 text-white text-[10px] font-bold">
            {index + 1}
          </div>

          {renderItem && (
            <div className="absolute inset-0 p-4">
              {renderItem(item)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function getFileIcon(type: string) {
  if (type.includes("pdf")) return <FileText className="h-6 w-6" />;
  if (type.includes("image")) return <Image className="h-6 w-6" />;
  return <File className="h-6 w-6" />;
}
