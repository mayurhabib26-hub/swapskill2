import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, X, CheckCircle2 } from 'lucide-react';

interface ReviewDialogProps {
  sessionId: string;
  recipientId: string;
  recipientName: string;
  skillName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewDialog: React.FC<ReviewDialogProps> = ({
  sessionId,
  recipientId,
  recipientName,
  skillName,
  isOpen,
  onClose,
}) => {
  const { addReview } = useApp();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview(sessionId, recipientId, rating, comment.trim(), skillName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-elevated border border-[#E2EAE6] relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#16845B] bg-[#EAF6F0] px-2.5 py-1 rounded-full">
            Peer Feedback
          </span>
          <h3 className="font-heading font-extrabold text-xl text-[#152238] mt-2">
            Review your session with {recipientName}
          </h3>
          <p className="text-xs text-[#64748B] mt-1">Topic: {skillName}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Star Rating */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-semibold text-[#152238]">How was the experience?</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="p-1 text-amber-400 focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating !== null ? star <= hoverRating : star <= rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {rating === 5 && 'Outstanding session!'}
              {rating === 4 && 'Very helpful and friendly'}
              {rating === 3 && 'Decent session'}
              {rating <= 2 && 'Needs improvement'}
            </span>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-semibold text-[#152238] uppercase tracking-wider mb-1.5">
              Your Feedback Comment
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you learn? Was the explanation clear? What was most helpful?"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-xs text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83]"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-[#64748B] hover:text-[#152238]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm transition-all"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
