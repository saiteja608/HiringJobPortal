public with sharing class JobPortalController {

    @AuraEnabled(cacheable=true)
    public static List<Job__c> getActiveJobs() {
        return [
            SELECT Id, Name, Location__c, Type__c, Description__c,
                   Skills_Required__c, Experience_Required__c, Salary__c, Is_Active__c
            FROM Job__c
            WHERE Is_Active__c = true
            ORDER BY CreatedDate DESC
        ];
    }

    @AuraEnabled(cacheable=true)
    public static Job__c getJobById(Id jobId) {
        return [
            SELECT Id, Name, Location__c, Type__c, Description__c,
                   Skills_Required__c, Experience_Required__c, Salary__c, Is_Active__c
            FROM Job__c
            WHERE Id = :jobId
            LIMIT 1
        ];
    }

    @AuraEnabled
    public static String submitApplication(
        Id jobId,
        String applicantName,
        String email,
        String phone,
        String resumeLink,
        Integer yearsOfExperience,
        String coverLetter
    ) {
        try {
            Job_Application__c app = new Job_Application__c(
                Job__c            = jobId,
                Applicant_Name__c = applicantName,
                Email__c          = email,
                Phone__c          = phone,
                Resume_Link__c    = resumeLink,
                Years_of_Experience__c = yearsOfExperience,
                Cover_Letter__c   = coverLetter,
                Status__c         = 'Submitted'
            );
            insert app;
            return app.Id;
        } catch (Exception e) {
            throw new AuraHandledException('Submission failed: ' + e.getMessage());
        }
    }
}
