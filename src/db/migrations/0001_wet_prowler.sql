ALTER TABLE "post" RENAME TO "posts";--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "post_authorId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
