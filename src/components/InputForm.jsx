const InputForm = (props) => {
  const style = {
    height: "200px",
  };
  return (
    <div className="container">
      <form onSubmit={props.handlesubmit}>
        <label>Name</label>
        <input
          type="text"
          name={props.namefield}
          placeholder="Enter Food Name"
          value={props.namevalue}
          onChange={props.handlechange}
          required
          className="form-control"
        ></input>

        <label>Description</label>
        <textarea
          style={style}
          className="form-control"
          placeholder="Write something.."
          name={props.descfield}
          value={props.descriptionvalue}
          onChange={props.handlechange}
          required
        ></textarea>

        <label className="form-label">{props.labelimage_or_price}</label>
        <input
          className="form-control"
          required
          type={props.number_or_text}
          placeholder="Enter the value"
          name={props.image_or_pricefield}
          value={props.image_or_pricevalue}
          onChange={props.handlechange}
        ></input>
        <hr></hr>
        <button type="submit" class="btn btn-primary">
          {props.create_or_update}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
