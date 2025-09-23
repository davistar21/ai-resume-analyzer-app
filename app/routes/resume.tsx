import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useParams } from "react-router";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/lib/puter";
export const meta = () => {
  [
    { title: "Resume.AI | Review" },
    { name: "description", content: "Detailed overview of your resume" },
  ];
};

const Resume = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [resumeRawData, setResumeRawData] = useState<Resume | null>(null);
  const { id } = useParams();
  const { fs, auth, isLoading, kv } = usePuterStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [isLoading]);
  const [localLoading, setLocalLoading] = useState(false);
  /*async function handleDelete() {
    try {
      setLocalLoading(true);
      // const files = (await fs.readDir("./")) as FSItem[];
      // const filteredFiles = files.filter(
      //   (file) =>
      //     file.path === resumeRawData?.imagePath ||
      //     file.path === resumeRawData?.imagePath
      // );
      // console.log("actual path", resumeRawData?.resumePath);
      // files.forEach((file) => {
      //   console.log(file.path);
      // });

      // console.log("all files", files);
      // console.log("filteredFiles", filteredFiles);
      await fs.delete(resumeRawData?.imagePath || "");
      await fs.delete(resumeRawData?.resumePath || "");
      // await kv.delete(`resume:${id}`);
      // if (!deleted) console.error("Failed to delete resume key");
      await kv.delete(`resume:${id}`);
      // await new Promise((r) => setTimeout(r, 500)); // 500ms delay
      const r = await kv.list("resume:*", true);
      console.log("resumesleft", r);
      // console.log(g);
      // await kv.delete("resume:67a0a09f-c386-40f1-b7fa-fbb56d7351db");
    } catch (err: any) {
      console.error("Error could not delete resume");
      console.error(err);
    } finally {
      setLocalLoading(false);
      // navigate("/");
      const r = (await kv.list("resume:*", true)) as KVItem[];
      // console.log("resumesleft", r);
    }
  }*/
  async function handleDelete() {
    try {
      setLocalLoading(true);

      // Wait for both file deletions to finish
      await Promise.all([
        fs.delete(resumeRawData?.imagePath || ""),
        fs.delete(resumeRawData?.resumePath || ""),
      ]);

      // Delete the resume key in KV
      const deleted = await kv.delete(`resume:${id}`);
      if (!deleted) {
        console.error("Failed to delete resume key");
      }

      // Optional small delay for consistency (like in wipeApp)
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Refresh the resumes list after deletion
      const resumesLeft = (await kv.list("resume:*", true)) as KVItem[];
      console.log("resumes left after deletion:", resumesLeft);

      // TODO: if you have a state holding resumes, update it here!
    } catch (err: any) {
      console.error("Error could not delete resume");
      console.error(err);
    } finally {
      setLocalLoading(false);
    }
  }

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;
      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);

      // kv.delete(``)
      console.log("data", data);
      setResumeRawData(data);
    };
    loadResume();
  }, [id]);
  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link
          to="/"
          className="flex p-2 group bg-red rounded-full items-center gap-2 hover:bg-gray-50 transition-all duration-300"
        >
          <img
            src="/icons/back.svg"
            alt="logo"
            className="w-2.5 h-2.5 group-hover:mr-1 mr-0 transition-all duration-300"
          />
          <span className="text-gray-800 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
        {/* <button
          className="text-white bg-red-700 font-semibold rounded-full px-4 py-2 cursor-pointer w-fit translate-0  hover:-translate-y-0.5 hover:bg-red-600 transition-all duration-300 ease-in-out"
          onClick={handleDelete}
        >
          Delete Resume
        </button> */}
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover sticky min-h-[100vh] top-0 ">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-2xl:h-fit w-fit">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  alt=""
                  className="w-full h-full object-contain rounded-2xl"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section">
          <h2 className="text-4xl !text-black font-bold ">Resume Review</h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <ATS score={feedback.ATS.score} suggestions={feedback.ATS.tips} />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" className="w-full" />
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
