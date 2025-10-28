import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle2 } from "lucide-react";
import type { FormStepProps } from "../../types";

const Step4Documents = ({
  formData,
  onFormChange,
  onFileChange,
}: FormStepProps) => {
  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">Supporting Documents</h2>
        <p className="text-muted-foreground">
          Add tags and upload any supporting files
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">
          Tags <span className="text-destructive">*</span>
        </Label>
        <Input
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={onFormChange}
          placeholder="e.g., SDG4, Education, Technology (comma-separated)"
        />
        <p className="text-sm text-muted-foreground">
          Separate multiple tags with commas
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="supporting_docs">Supporting Documents (Optional)</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors">
          <input
            id="supporting_docs"
            type="file"
            multiple
            onChange={onFileChange}
            className="hidden"
          />
          <label
            htmlFor="supporting_docs"
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            {formData.supporting_docs.length > 0 ? (
              <>
                <CheckCircle2 className="w-10 h-10 text-success" />
                <p className="text-sm font-medium">
                  {formData.supporting_docs.length} file(s) selected
                </p>
                <p className="text-xs text-muted-foreground">Click to change</p>
              </>
            ) : (
              <>
                <Upload className="w-10 h-10 text-muted-foreground" />
                <p className="text-sm font-medium">Click to upload documents</p>
                <p className="text-xs text-muted-foreground">
                  PDF, DOC, or images (max 10MB each)
                </p>
              </>
            )}
          </label>
        </div>
        {formData.supporting_docs.length > 0 && (
          <div className="space-y-1 mt-2">
            {formData.supporting_docs.map((file, index) => (
              <p key={index} className="text-xs text-muted-foreground">
                • {file.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Step4Documents;
