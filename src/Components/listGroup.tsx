import React from "react";
import "./listGroup.css";

interface ListGroupProps{
items:any[];
textProperty:string;
valueProperty:string;
selectedItem:any;
onItemSelect:(item:any)=>void;
}

const ListGroup:React.FC<ListGroupProps> = (props) => {
  // const { items, textProperty, valueProperty, selectedItem, onItemSelect } =
  //   props;
  return (
    <ul className="list-group jesus">
      {props.items.map((item,index) => (
        <li 
          onClick={() =>props.onItemSelect(item)}
          key={index}
          className={
            item === props.selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[props.textProperty]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
