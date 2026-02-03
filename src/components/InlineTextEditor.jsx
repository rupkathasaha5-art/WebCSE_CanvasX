import Editor, {
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
} from "react-simple-wysiwyg";

export default function InlineTextEditor({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <Editor 
        value={value || ""} 
        onChange={onChange}
        placeholder={placeholder}
        containerProps={{
          style: {
            minHeight: "32px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            padding: "4px 8px",
          }
        }}
      >
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
        </Toolbar>
      </Editor>
    </div>
  );
}
