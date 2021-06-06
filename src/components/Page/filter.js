import { Menu, Radio, Slider } from 'antd';
import React, { useEffect, useState } from 'react';
import '../../css/filter.css';
import axios from 'axios';

const { SubMenu } = Menu;

const Category = ({sortPrice, getPriceRange}) =>{
    const [category, setCategory] = useState([])
    const onCheck = (e) =>{
        sortPrice(e.target.value)
    }
    const onSelect = (e) =>{
        console.log(e)
    }

    const getCategoryData = () =>{
        try {
            axios.get("https://mighty-meadow-74982.herokuapp.com/cate")
                .then(response=>{
                    setCategory(response.data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }    
    useEffect(()=>{                                                         
        getCategoryData();
    },[])
    return(
        <Menu
        defaultOpenKeys={['sub1','sub2','sub4']}
        mode="inline"
        className="shadow-sm rounded"
        onSelect={onSelect}
      >
          <div className="filter-title">
              <p><i class="far fa-sliders-h"></i>Bộ lọc</p>
          </div>
            <SubMenu key="sub1"  title="Số hành khách tối đa">
                <Menu.Item >Tất cả</Menu.Item>
                {category.map(cate=>(
                    <Menu.Item key={cate.idCategory}> Xe {cate.nameCate} chỗ </Menu.Item>
                ))}
            </SubMenu>
            <SubMenu key="sub2"  title="Giá từ">
                <Menu.Item style={{paddingRight:'50px', height:'90px', paddingTop:'50px'}}>
                    <Slider
                    tooltipVisible
                    defaultValue={[0,5000000]} 
                    range  step={100000} 
                    min={0}
                    max={5000000}
                    tipFormatter = {value=>{
                        return(
                        <span>{new Intl.NumberFormat().format(value)}</span>
                        )
                    }}
                    onChange={(value)=>{
                        getPriceRange(value);
                    }}
                    />
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub4"  title="Sắp xếp">
                <Menu.Item style={{height: '100%', paddingLeft:'20px'}}>
                    <Radio.Group  onChange={onCheck} >
                        <Radio value={'none'}>Mặc định</Radio>
                        <Radio value={'low'}>Giá từ thấp đến cao</Radio>
                        <Radio value={'high'}>Giá từ cao đến thấp</Radio>
                    </Radio.Group>
                </Menu.Item>
            </SubMenu>
      </Menu>
    );
}
export default Category