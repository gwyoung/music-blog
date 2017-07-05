import { PostPermissions } from '../../../both/permissions/post.permissions';

declare var Slingshot: any;

Slingshot.fileRestrictions("imageUploads", {
    allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ], // only image files
    maxSize: 10 * 1024 * 1024 // 10MB max
});

Slingshot.createDirective("imageUploads", Slingshot.S3Storage, {
    bucket: "music-blog",
    acl: "public-read",
    region: "us-west-2",

    authorize: function () {
        return PostPermissions.update(this.userId);
    },

    key: function (file) {
        return 'albums/' + file.name;
    }
});