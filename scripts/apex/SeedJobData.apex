// Run this in Developer Console (Execute Anonymous) to seed sample job data
List<Job__c> jobs = new List<Job__c>{
    new Job__c(
        Name                  = 'Senior Salesforce Developer',
        Location__c           = 'San Francisco, CA',
        Type__c           = 'Full-Time',
        Description__c        = 'We are looking for an experienced Salesforce Developer to join our growing CRM team. You will design, develop, and deploy enterprise-grade Salesforce solutions across Sales Cloud, Service Cloud, and Experience Cloud.',
        Skills_Required__c    = 'Apex, LWC, Flow, SOQL, REST APIs, Salesforce DX, Git',
        Experience_Required__c = '5+ years',
        Salary__c       = '$120,000 - $150,000',
        Is_Active__c          = true
    ),
    new Job__c(
        Name                  = 'LWC Frontend Engineer',
        Location__c           = 'Remote',
        Type__c           = 'Remote',
        Description__c        = 'Join our platform team to build next-generation Lightning Web Components. You will collaborate with UX designers and backend engineers to deliver pixel-perfect, accessible, and performant UI experiences.',
        Skills_Required__c    = 'LWC, JavaScript, HTML, CSS, SLDS, Jest, Accessibility',
        Experience_Required__c = '3+ years',
        Salary__c       = '$90,000 - $115,000',
        Is_Active__c          = true
    ),
    new Job__c(
        Name                  = 'Salesforce Business Analyst',
        Location__c           = 'New York, NY',
        Type__c           = 'Full-Time',
        Description__c        = 'Work closely with stakeholders to gather requirements, document processes, and translate business needs into Salesforce configurations and customizations. Facilitate sprint planning and user acceptance testing.',
        Skills_Required__c    = 'Salesforce Admin, Process Builder, Flow, User Stories, JIRA',
        Experience_Required__c = '2+ years',
        Salary__c       = '$75,000 - $95,000',
        Is_Active__c          = true
    ),
    new Job__c(
        Name                  = 'DevOps / Release Engineer',
        Location__c           = 'Austin, TX',
        Type__c           = 'Contract',
        Description__c        = 'Own the CI/CD pipeline for our Salesforce org. Implement automated deployments using SFDX, GitHub Actions, and Copado. Ensure code quality through automated testing and static analysis.',
        Skills_Required__c    = 'SFDX, GitHub Actions, Copado, PMD, Apex Tests, Bash',
        Experience_Required__c = '4+ years',
        Salary__c       = '$70 - $90/hour',
        Is_Active__c          = true
    ),
    new Job__c(
        Name                  = 'Salesforce Marketing Cloud Specialist',
        Location__c           = 'Chicago, IL',
        Type__c           = 'Full-Time',
        Description__c        = 'Design and execute multi-channel marketing campaigns using Salesforce Marketing Cloud. Build email journeys, manage audience segmentation, and analyse campaign performance to drive engagement.',
        Skills_Required__c    = 'Marketing Cloud, Email Studio, Journey Builder, AMPscript, SQL',
        Experience_Required__c = '2+ years',
        Salary__c       = '$80,000 - $100,000',
        Is_Active__c          = true
    ),
    new Job__c(
        Name                  = 'Junior Salesforce Admin (Internship)',
        Location__c           = 'Remote',
        Type__c           = 'Internship',
        Description__c        = 'Great opportunity for recent graduates to kick-start a Salesforce career. You will assist in system configuration, user management, reports, and dashboards under the guidance of senior admins.',
        Skills_Required__c    = 'Salesforce Admin Basics, Reports, Dashboards, Data Loader',
        Experience_Required__c = '0-1 years',
        Salary__c       = '$20 - $25/hour',
        Is_Active__c          = true
    )
};

insert jobs;
System.debug('Seeded ' + jobs.size() + ' job records.');
