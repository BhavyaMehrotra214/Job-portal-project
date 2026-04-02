import Job from "../models/Job.js";

// Create Job (Recruiter)
export const createJob = async (req, res) => {
  const job = await Job.create({
    ...req.body,
    createdBy: req.user.id
  });
  res.json(job);
};

// Get All Jobs
export const getJobs = async (req, res) => {
  const jobs = await Job.find().populate("createdBy", "name");
  res.json(jobs);
};