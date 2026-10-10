import Image from "next/image";

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  className?: string;
}

export default function UserAvatar({
  src,
  name,
  className = "w-9 h-9 rounded-2xl",
}: UserAvatarProps) {
  if (src) {
    return (
      <div
        className={`overflow-hidden bg-slate-100 shrink-0 border border-slate-200/90 ${className}`}
      >
        <Image
          src={src}
          alt={name || "User"}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden bg-slate-100 border border-slate-200/90 flex items-center justify-center shrink-0 shadow-2xs ${className}`}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <rect width="40" height="40" fill="#f1f5f9" />
        <circle cx="20" cy="15" r="7" fill="#94a3b8" />
        <path
          d="M8 35C8 28.3726 13.3726 23 20 23C26.6274 23 32 28.3726 32 35V37H8V35Z"
          fill="#94a3b8"
        />
      </svg>
    </div>
  );
}
