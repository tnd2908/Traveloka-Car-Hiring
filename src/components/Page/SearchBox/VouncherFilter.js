import { Input, AutoComplete } from "antd";
import { useEffect, useState } from "react";

const VouncherPopup = (props) => {
  const [resultFilter, setResultFilter] = useState([]);
  const renderTitle = (title, discount, main_text) => (
    <span>
      {title}
      <a
        style={{
          float: "right",
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );

  const renderItem = (item, index) => {
    console.log(item)
    return ({
      value: item[1][1],
      label: (
        <div key={index} className="container">
          <h6 key={index}>Mã {item[1][1]}</h6>
          <h7 key={index}>
            Khuyến mãi {item[5][1]}
            {item[18][1] && <span key={index}> tối đa {item[18][1]}</span>}
          </h7>
        </div>
      ),
    });
  }

  // useEffect(() => {
  //     for(let i = 0; i < props.result.length ; i++) {
  //         i = 0 && setResultFilter([props.result[i]])
  //         for (let j = 0; j < props.result.length; j++) {
  //             if(props.result[i]._id !== props.result[j]._id) {
  //                 setResultFilter([...resultFilter, props.result[i]])
  //             }
  //         }
  //     }
  // }, [])

  const option = props.result.map((item,index) => {
    return {
      key: index,
      value: item.VoucherID
    };
  });
  // const option = [
  //   {
  //     key: 0,
  //     options: [renderItem('AntDesign', 10000)],
  //   },
  //   {
  
  //     options: [renderItem('AntDesign UI FAQ', 60100)],
  //   },
  //   {
      
  //     options: [renderItem('AntDesign design language', 100000)],
  //   },
  // ];
  
  return (
    <AutoComplete
      {...props}
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={200}
      options={option}
    >
      <Input size="large" placeholder="Nhập vouncher" />
    </AutoComplete>
  );
};

export default VouncherPopup;
