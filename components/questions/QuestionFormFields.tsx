'use client';

import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { useState } from 'react';
import type { QuestionFormValues } from '@/lib/validations/question';
import ContentEditor from '../common/ContentEditor';

export function QuestionFormFields() {
  const { control, watch } = useFormContext<QuestionFormValues>();
  const [newTag, setNewTag] = useState('');
  const tags = watch('tags');

  const handleAddTag = (field: any) => {
    if (newTag && !tags.includes(newTag) && tags.length < 5) {
      field.onChange([...tags, newTag.toLowerCase()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string, field: any) => {
    field.onChange(tags.filter((tag: string) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="What's your programming question?"
                className="font-medium "
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Details</FormLabel>
            <FormControl>
              <ContentEditor
                initialValue={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <div className="space-y-2">
              <div className="flex gap-2">

                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag(field)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleAddTag(field)}
                  disabled={!newTag || tags.length >= 5}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="px-2 py-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleRemoveTag(tag, field)}
                    >
                      {tag}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="bounty"
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel>Bounty Amount</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0.01}
                step={0.01}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
