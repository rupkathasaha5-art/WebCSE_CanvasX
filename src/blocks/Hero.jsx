import { uploadToCloudinary } from "../utils/cloudinary";

export function HeroBlock({ data, onChange }) {
  const update = (patch) => onChange({ ...data, ...patch });

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 1) upload file to Cloudinary
      const url = await uploadToCloudinary(file);

      // 2) store Cloudinary URL in block data
      update({ avatarUrl: url });
    } catch (err) {
      console.error("Cloudinary upload failed", err);
    }
  };

  return (
    <div className="space-y-2 text-xs">
      <div className="flex items-center gap-3">
        {/* hidden file input */}
        <input
          id="hero-avatar-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* clickable circle */}
        <label
          htmlFor="hero-avatar-input"
          className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-slate-200 cursor-pointer"
        >
          {data.avatarUrl ? (
            <img
              src={data.avatarUrl}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-500">
              Photo
            </div>
          )}
        </label>

        {/* keep rest the same, but remove previous Image URL input */}
      </div>

      <input
        className="w-full rounded border border-slate-300 px-2 py-1"
        placeholder="Name"
        value={data.name ?? ""}
        onChange={(e) => update({ name: e.target.value })}
      />

      <input
        className="w-full rounded border border-slate-300 px-2 py-1"
        placeholder="Designation"
        value={data.designation ?? ""}
        onChange={(e) => update({ designation: e.target.value })}
      />
    </div>
  );
}


