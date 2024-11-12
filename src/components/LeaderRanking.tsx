import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from '@heroicons/react/24/solid';
import type { Leader } from '../data/leaders';
import CommentSection from './comments/CommentSection';

interface LeaderRankingProps {
  leader: Leader;
}

export default function LeaderRanking({ leader }: LeaderRankingProps) {
  const positionChange = leader.previousPosition - leader.position;
  
  const getChangeIcon = () => {
    if (positionChange > 0) {
      return <ArrowUpIcon className="w-4 h-4 text-green-500" />;
    } else if (positionChange < 0) {
      return <ArrowDownIcon className="w-4 h-4 text-red-500" />;
    }
    return <MinusIcon className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-4 hover:border-purple-500/30 transition-colors duration-200">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={leader.avatar}
            alt={leader.name}
            className="w-16 h-16 rounded-full bg-gray-800"
          />
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm border-2 border-gray-900">
            #{leader.position}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-medium text-white">{leader.name}</h3>
            {getChangeIcon()}
          </div>
          <p className="text-sm text-purple-400 mb-2">{leader.country}</p>
          
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Approval Rating</span>
              <span className="text-white font-medium">{leader.approvalRating}%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${leader.approvalRating}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300">Key Achievements:</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              {leader.keyAchievements.map((achievement, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-500 rounded-full" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-800">
            <h4 className="text-sm font-medium text-gray-300 mb-1">Recent Policy Impact:</h4>
            <p className="text-sm text-gray-400">{leader.recentPolicies}</p>
          </div>

          <CommentSection leaderId={leader.id} />
        </div>
      </div>
    </div>
  );
}