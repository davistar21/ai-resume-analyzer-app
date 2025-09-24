import { Link } from "react-router";
import { ScoreCircle } from "../components/ScoreCircle";
import { usePuterStore } from "~/lib/puter";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
const ResumeCard = ({
  resume: { id, companyName, jobTitle, imagePath, feedback },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    async function loadResume() {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    }
    loadResume();
  }, [imagePath]);
  return (
    <Link
      to={`resume/${id}`}
      className="resume-card animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      <div className="resume-card-header flex justify-between p-3 items-center mb-3">
        <div className="flex flex-col items-start gap-2">
          {companyName && (
            <h2 className="break-words !text-black font-bold">{companyName}</h2>
          )}
          {jobTitle && (
            <h3 className="text-lg break-words text-gray-500 text-ellipsis">
              {jobTitle}
            </h3>
          )}
          {!companyName && !jobTitle && (
            <h2 className="!text-black font-bold">Resume</h2>
          )}
        </div>
        <div className="flex-shrink-0 ">
          <ScoreCircle
            value={feedback.overallScore}
            strokeWidth={15}
            size={120}
          />
        </div>
      </div>
      {resumeUrl ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full overflow-hidden rounded-md"
        >
          <img
            src={resumeUrl}
            alt="resume"
            className="h-[350px] max-sm:h-[200px] w-full object-cover gradient-border"
          />
        </motion.div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="w-full rounded-md flex flex-col gap-2 overflow-hidden animate-pulse ">
            <div className="h-10 rounded-md bg-gray-200"></div>
            <div className="h-4 rounded-md bg-gray-200"></div>
            <div className="h-2 rounded-md bg-gray-200"></div>
            <div className="h-2 rounded-md bg-gray-200"></div>
          </div>
          <div className="w-full rounded-md flex flex-col gap-2 overflow-hidden animate-pulse ">
            <div className="h-10 rounded-md bg-gray-200"></div>
            <div className="h-4 rounded-md bg-gray-200"></div>
            <div className="h-2 rounded-md bg-gray-200"></div>
            <div className="h-2 rounded-md bg-gray-200"></div>
          </div>
          <div className="w-full rounded-md flex flex-col gap-2 overflow-hidden animate-pulse ">
            <div className="h-10 rounded-md bg-gray-200"></div>
            <div className="h-4 rounded-md bg-gray-200"></div>
            <div className="h-2 rounded-md bg-gray-200"></div>
            <div className="h-2 rounded-md bg-gray-200"></div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;

// function Dashboard() {
//   return (
//     <div className="p-6 space-y-6 flex w-[300px] flex-wrap gap-2">
//       <ScoreCircle value={78} color="#3b82f6" /> {/* Tailwind blue-500 */}
//       <ScoreCircle value={45} color="#f87171" /> {/* Tailwind red-400 */}
//       <ScoreCircle value={92} color="#10b981" /> {/* Tailwind emerald-500 */}
//       <ScoreCircle value={30} color="#facc15" backgroundColor="#fef3c7" />
//     </div>
//   );
// }
