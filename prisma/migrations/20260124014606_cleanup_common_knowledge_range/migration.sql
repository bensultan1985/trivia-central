-- Clean invalid/empty values in commonKnowledgeUserDateRange.
-- We store either NULL or a JSON array of 1-2 integers.
UPDATE "TriviaQuestion"
SET "commonKnowledgeUserDateRange" = NULL
WHERE "commonKnowledgeUserDateRange" IS NOT NULL
    AND jsonb_typeof("commonKnowledgeUserDateRange") = 'array'
    AND NOT EXISTS (
        SELECT 1
        FROM jsonb_array_elements("commonKnowledgeUserDateRange") AS e
        WHERE e <> 'null'::jsonb
    );