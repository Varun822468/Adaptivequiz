// Profile photo, or coloured initials when no photo is saved.
export default function UserAvatar({ user, size = 40, ring = "", className = "" }) {
  const name = user?.name || user?.email || "User";
  const initials = name
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  const style = { width: size, height: size, fontSize: size * 0.38 };

  if (user?.photoUrl) {
    return (
      <img
        src={user.photoUrl}
        alt={name}
        style={style}
        className={`rounded-full object-cover shrink-0 ${ring} ${className}`}
      />
    );
  }
  return (
    <div
      style={style}
      className={`rounded-full shrink-0 flex items-center justify-center font-bold text-white bg-gradient-to-br from-violet-500 to-fuchsia-500 ${ring} ${className}`}
    >
      {initials || "U"}
    </div>
  );
}
