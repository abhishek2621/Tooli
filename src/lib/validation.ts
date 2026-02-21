import { z } from "zod";

// File validation constants
export const FILE_LIMITS = {
    PDF: {
        maxSizeMB: 50,
        maxSizeBytes: 50 * 1024 * 1024,
        allowedTypes: ["application/pdf"],
        allowedExtensions: [".pdf"],
    },
    IMAGE: {
        maxSizeMB: 25,
        maxSizeBytes: 25 * 1024 * 1024,
        allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        allowedExtensions: [".jpg", ".jpeg", ".png", ".webp", ".gif"],
        maxWidth: 8000,
        maxHeight: 8000,
    },
    TEXT: {
        maxSizeMB: 10,
        maxSizeBytes: 10 * 1024 * 1024,
        allowedTypes: ["text/plain"],
        allowedExtensions: [".txt"],
    },
} as const;

// Validation helper functions
export function validateFileSize(
    file: File,
    maxBytes: number,
    maxMB: number
): { valid: boolean; error?: string } {
    if (file.size > maxBytes) {
        return {
            valid: false,
            error: `File too large. Maximum size is ${maxMB}MB`,
        };
    }
    return { valid: true };
}

export function validateFileType(
    file: File,
    allowedTypes: readonly string[],
    allowedExtensions: readonly string[]
): { valid: boolean; error?: string } {
    const hasValidType = allowedTypes.includes(file.type as string);
    const ext = getFileExtension(file.name);
    const hasValidExt = allowedExtensions.some(e => e.toLowerCase().slice(1) === ext);
    
    if (!hasValidType && !hasValidExt) {
        return {
            valid: false,
            error: `Invalid file type. Allowed: ${allowedExtensions.join(", ")}`,
        };
    }
    return { valid: true };
}

export function validateFile(
    file: File,
    type: "pdf" | "image" | "text"
): { valid: boolean; error?: string } {
    const limits = FILE_LIMITS[type.toUpperCase() as keyof typeof FILE_LIMITS];
    
    const sizeCheck = validateFileSize(file, limits.maxSizeBytes, limits.maxSizeMB);
    if (!sizeCheck.valid) return sizeCheck;
    
    const typeCheck = validateFileType(file, limits.allowedTypes, limits.allowedExtensions);
    if (!typeCheck.valid) return typeCheck;
    
    return { valid: true };
}

export function validateFiles(
    files: File[],
    type: "pdf" | "image" | "text",
    maxFiles: number = 20
): { valid: boolean; errors: string[]; validFiles: File[] } {
    const errors: string[] = [];
    const validFiles: File[] = [];
    
    if (files.length > maxFiles) {
        errors.push(`Too many files. Maximum is ${maxFiles}`);
        return { valid: false, errors, validFiles: [] };
    }
    
    for (const file of files) {
        const result = validateFile(file, type);
        if (result.valid) {
            validFiles.push(file);
        } else {
            errors.push(`${file.name}: ${result.error}`);
        }
    }
    
    return {
        valid: errors.length === 0,
        errors,
        validFiles,
    };
}

export function validateImageDimensions(
    file: File,
    maxWidth: number = 8000,
    maxHeight: number = 8000
): Promise<{ valid: boolean; error?: string; width?: number; height?: number }> {
    return new Promise((resolve) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        
        img.onload = () => {
            URL.revokeObjectURL(url);
            
            if (img.width > maxWidth || img.height > maxHeight) {
                resolve({
                    valid: false,
                    error: `Image too large. Maximum dimensions are ${maxWidth}x${maxHeight}px`,
                    width: img.width,
                    height: img.height,
                });
            } else {
                resolve({
                    valid: true,
                    width: img.width,
                    height: img.height,
                });
            }
        };
        
        img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve({
                valid: false,
                error: "Could not read image dimensions",
            });
        };
        
        img.src = url;
    });
}

// Format file size for display
export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Get file extension
export function getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
}

// Check if file is likely valid based on magic bytes
export async function validateFileMagicBytes(
    file: File,
    expectedMagic: number[],
    offset: number = 0
): Promise<boolean> {
    try {
        const buffer = await file.slice(offset, offset + expectedMagic.length).arrayBuffer();
        const bytes = new Uint8Array(buffer);
        
        return expectedMagic.every((byte, i) => bytes[i] === byte);
    } catch {
        return false;
    }
}

// PDF magic bytes: %PDF
export async function validatePdfMagicBytes(file: File): Promise<boolean> {
    return validateFileMagicBytes(file, [0x25, 0x50, 0x44, 0x46], 0);
}

// Image magic bytes
export async function validateImageMagicBytes(
    file: File
): Promise<boolean> {
    const type = file.type;
    
    const magicBytes: Record<string, number[]> = {
        "image/jpeg": [0xFF, 0xD8, 0xFF],
        "image/png": [0x89, 0x50, 0x4E, 0x47],
        "image/gif": [0x47, 0x49, 0x46, 0x38],
    };
    
    const magic = magicBytes[type];
    if (!magic) return false;
    
    return validateFileMagicBytes(file, magic, 0);
}

// Numeric input validation helpers
export function clampNumber(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function parseNumericInput(value: string, fallback: number = 0): number {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? fallback : parsed;
}
