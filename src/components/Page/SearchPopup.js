import { Input, AutoComplete } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const renderTitle = (title, address) => (
  <span>
    {title}
    <a
      style={{
        float: 'right',
      }}
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a>
    <p>{address}</p>
  </span>
);

const renderItem = (title, address) => ({
  value: title,
  label: (
    <div
    >
      <h5>{title}</h5><br/>
      <h7>{address}</h7>
    </div>
  ),
});

const options = [
  {
    label: renderTitle('Libraries'),
    options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
  },
  {
    label: renderTitle('Solutions'),
    options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
  },
  {
    label: renderTitle('Articles'),
    options: [renderItem('AntDesign design language', 100000)],
  },
];

const SearchPopup = (props) => {
const option = props.result.map(item => ({
    options: [renderItem(item.title,item.address)]
}))
return (
    <AutoComplete
        {...props}
        dropdownClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={500}
        options={option}
    >
    <Input size="large" placeholder="Địa chỉ" />
  </AutoComplete>
  )
};
export default SearchPopup