import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext.jsx";
import SkillsOnboardingModal from "./SkillsOnboardingModal.jsx";

export default function OnboardingGate() {
  const { isAuthenticated, user, updateUser } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setOpen(false);
      return;
    }
    const userId = user.id || user.userId || user._id;
    const dismissedKey = `skillsOnboardingDismissed:${userId}`;
    const dismissed = localStorage.getItem(dismissedKey) === "true";
    const hasSkills = Array.isArray(user.skills) && user.skills.length > 0;

    if (!dismissed && !hasSkills) {
      setOpen(true);
    }
  }, [isAuthenticated, user]);

  const handleClose = () => setOpen(false);
  const handleComplete = () => {
    const userId = user?.id || user?.userId || user?._id;
    if (userId) localStorage.setItem(`skillsOnboardingDismissed:${userId}`, "true");
    setOpen(false);
  };

  const handleSkillsUpdate = (updatedUser) => {
    updateUser({ skills: updatedUser.skills });
  };

  if (!open || !user) return null;

  return (
    <SkillsOnboardingModal
      isOpen={open}
      onClose={handleClose}
      onComplete={handleComplete}
      userId={user.id || user.userId || user._id}
      onSkillsUpdate={handleSkillsUpdate}
    />
  );
}
