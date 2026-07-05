declare module "@salesforce/apex/JobPortalController.getActiveJobs" {
  export default function getActiveJobs(): Promise<any>;
}
declare module "@salesforce/apex/JobPortalController.getJobById" {
  export default function getJobById(param: {jobId: any}): Promise<any>;
}
declare module "@salesforce/apex/JobPortalController.submitApplication" {
  export default function submitApplication(param: {jobId: any, applicantName: any, email: any, phone: any, resumeLink: any, yearsOfExperience: any, coverLetter: any}): Promise<any>;
}
