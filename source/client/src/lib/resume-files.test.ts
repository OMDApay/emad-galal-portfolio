import { describe, expect, it } from "vitest";
import { resumeFiles } from "./resume-files";

describe("resume files", () => {
  it("contains the three supplied professional PDFs with stable storage links", () => {
    expect(resumeFiles).toHaveLength(3);

    for (const resume of resumeFiles) {
      expect(resume.url).toMatch(/^\/manus-storage\/[\w-]+\.pdf$/);
      expect(resume.fileName).toMatch(/\.pdf$/);
      expect(resume.titleAr).toBeTruthy();
      expect(resume.titleEn).toBeTruthy();
      expect(resume.audienceAr).toBeTruthy();
      expect(resume.audienceEn).toBeTruthy();
    }

    expect(resumeFiles.map((resume) => resume.fileName)).toEqual([
      "MasterProfessionalCV.pdf",
      "Driver_FleetManagementCV.pdf",
      "Digital_AI_MarketingCV.pdf",
    ]);
  });
});
