-- Create storage buckets for PDF files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resume-pdfs', 'resume-pdfs', true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-pdfs', 'project-pdfs', true);

-- Create policies for public access to PDFs
CREATE POLICY "Public PDF access for resume" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'resume-pdfs');

CREATE POLICY "Public PDF access for projects" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'project-pdfs');

-- Allow anyone to upload PDFs (you can restrict this later)
CREATE POLICY "Allow PDF uploads for resume" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'resume-pdfs');

CREATE POLICY "Allow PDF uploads for projects" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'project-pdfs');