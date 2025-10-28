import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { FormStepProps } from "../../types";

const Step2Objectives = ({ formData, onFormChange }: FormStepProps) => {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">Objectives & Details</h2>
        <p className="text-muted-foreground">
          Define your goals, team, and potential challenges
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="team_size">
          Team Size <span className="text-destructive">*</span>
        </Label>
        <Input
          id="team_size"
          name="team_size"
          value={formData.team_size}
          onChange={onFormChange}
          placeholder="e.g., 5 students, 2 teachers"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="expected_outcome">
          Expected Outcome <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="expected_outcome"
          name="expected_outcome"
          value={formData.expected_outcome}
          onChange={onFormChange}
          placeholder="Describe what success looks like for this project..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="potential_risks">
          Potential Risks & Challenges{" "}
          <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="potential_risks"
          name="potential_risks"
          value={formData.potential_risks}
          onChange={onFormChange}
          placeholder="What challenges or obstacles might you face?"
          rows={4}
        />
      </div>
    </motion.div>
  );
};

export default Step2Objectives;
