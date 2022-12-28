// ** to replace _
const nameHandler = (val) => {
    if (val.includes("_")) {
      return val.replace(/_/g, " ");
    } else {
      return val;
    }
  },
  CustomOption = ({ innerProps, data }) => (
    <div {...innerProps}>
      <div className="p-3 pt-1 pb-1 select_option first_uppercase">
        {data.label}
      </div>
    </div>
  );

export { nameHandler, CustomOption };
