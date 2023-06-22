import { TextField } from "@mui/material";
import { AuthInfo } from "../type";

type InputBoxProps = {
  id: string;
  label: string;
  inputStyle: string;
  name: string;
  type: string;
  loginInfo: AuthInfo;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const InputBox = ({
  id,
  label,
  name,
  inputStyle,
  onChange,
  loginInfo,
  type,
}: InputBoxProps) => {
  return (
    <TextField
      name={name}
      id={id}
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      value={loginInfo[name]}
      onChange={(e) => onChange(e)}
      InputProps={{
        classes: {
          input: inputStyle,
        },
      }}
    />
  );
};

export default InputBox;
