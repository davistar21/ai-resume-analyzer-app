import { Link } from "react-router";

const ResumeCard = ({
  key,
  resume: { id, companyName, jobTitle, imagePath, feedback },
}: {
  key: string;
  resume: Resume;
}) => {
  return (
    <Link
      key={key}
      to={`resume/${id}`}
      className="resume-card animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      <div className="resume-card-header flex justify-between p-3 items-center mb-3">
        <div className="flex flex-col gap-2">
          <h2 className="break-words !text-black font-bold">{companyName}</h2>
          <h3 className="text-lg break-words text-gray-500 text-ellipsis">
            {jobTitle}
          </h3>
        </div>
        <div className="flex-shrink-0 ">
          <ScoreCircle
            value={feedback.overallScore}
            strokeWidth={15}
            size={120}
          />
        </div>
      </div>
      <div className="w-full overflow-hidden rounded-md">
        <img
          src={imagePath}
          alt=""
          className="h-full w-full object-cover gradient-border"
        />
      </div>
    </Link>
  );
};

export default ResumeCard;
import { ScoreCircle } from "../components/ScoreCircle";

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
