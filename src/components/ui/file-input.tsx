"use client";

import React, { forwardRef, useState } from 'react';
import { Input } from './input';
import { Label } from './label';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { UploadCloud, X } from 'lucide-react';

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({ id, label, className, ...props }, ref) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    // This is tricky without full control, but we can try to reset the input
    if (props.onChange) {
      const emptyEvent = {
        target: { files: null }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      props.onChange(emptyEvent);
    }
  };


  return (
    <div className="w-full">
      <Label htmlFor={id}>{label}</Label>
      <div className={cn("mt-2 flex items-center justify-between rounded-md border border-input p-2", className)}>
        <div className="flex items-center gap-2 truncate">
          <UploadCloud className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground truncate">
            {selectedFile ? selectedFile.name : 'No file selected'}
          </span>
        </div>
        {selectedFile ? (
          <Button variant="ghost" size="icon" type="button" onClick={handleRemoveFile}>
            <X className="h-4 w-4" />
          </Button>
        ) : (
          <Button asChild variant="outline" size="sm" type="button">
            <Label htmlFor={id} className="cursor-pointer">Browse</Label>
          </Button>
        )}
      </div>
      <Input
        id={id}
        type="file"
        ref={ref}
        className="hidden"
        {...props}
        onChange={(e) => {
            handleFileChange(e);
            if (props.onChange) props.onChange(e);
        }}
      />
    </div>
  );
});

FileInput.displayName = 'FileInput';

export { FileInput };
