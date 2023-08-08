type Props = {
  errors: Object
}

const Errors = ({errors}: Props) => {

  return (
    <div>
      {Object.keys(errors).map((key) => {
        return <p className="text-sm text-red-400" key={key}>{errors[key]}</p>
      })}
    </div>
  );
};

export default Errors;