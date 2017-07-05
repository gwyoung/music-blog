Music Blog

This is a simple music blog application built using the Meteor and Angular frameworks. It allows an admin user to make posts with reviews of albums or lists of albums. It also allows readers to filter and search for posts to find related posts.

Set-up is identical to the set-up for the Angular2-Meteor tutorial.

Deployment requires a settings.json file in the root folder with the following settings:

{
    "AWSAccessKeyId": "<AWS public key>",
    "AWSSecretAccessKey": "<AWS secret key>",

    "AdminEmail": "<admin user's email>",
    "AdminPassword": "<admin user's password>",

    "galaxy.meteor.com": {
        "env": {
            "MONGO_URL": "<url to deployment mongodb database>"
        }
    }
}