export class PostFilter {
    slug?: string;
    excludedPostIds?: string[];
    artists?: string[];
    label?: string;
    year?: number;
    genre?: string;
    recommended?: boolean;
    headphones?: boolean;
    isList?: boolean;

    toQuery(): Object {
        let query: Object = {};

        if (this.slug) {
            query = {
                $and: [ query, { slug: this.slug } ]
            };
        }

        if (this.excludedPostIds && this.excludedPostIds.length) {
            query = {
                $and: [ query, { _id: { $nin: this.excludedPostIds } }]
            };
        }

        if (this.artists && this.artists.length) {
            query = {
                $and: [ query, { 
                    albums: {
                        $elemMatch: { 
                            artists: {
                                $in: this.artists
                            }
                        }
                    }
                }]
            };
        }

        if (this.label) {
            query = {
                $and: [ query, { 
                    albums: {
                        $elemMatch: { label: this.label }
                    }
                }]
            };
        }

        if (this.year) {
            query = {
                $and: [ query, { 
                    albums: {
                        // Match the inverse of "having an album with a different year"
                        // to get only posts where all albums are from that year
                        // This is so year-end lists will show up with the year filter
                        // but other lists with various years will not
                        $not: { 
                            $elemMatch: { year: { $ne: this.year } } 
                        }
                    }
                }]
            };
        }

        if (this.genre) {
            query = {
                $and: [ query, { 
                    albums: {
                        $elemMatch: { genres: this.genre }
                    }
                }]
            };
        }

        if (this.recommended) {
            query = {
                $and: [ query, {
                    albums: {
                        $elemMatch: { recommended: this.recommended }
                    }
                }]
            };
        }

        if (this.headphones !== undefined) {
            query = {
                $and: [ query, {
                    albums: {
                        // Match the inverse of "having an album with a different value for
                        // headphones" to get only posts where all albums match
                        $not: { 
                            $elemMatch: { headphones: { $ne: this.headphones } } 
                        }
                    }
                }]
            }
        }

        if (this.isList !== undefined) {
            query = {
                $and: [ query, {
                    albums: this.isList
                        ? { $not: { $size: 1 } }
                        : { $size: 1 }
                }]
            };
        }

        return query;
    }
}