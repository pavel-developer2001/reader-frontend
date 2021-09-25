import React from "react";
import { Button, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./Filters.module.scss";

const { Option } = Select;

const Filters = () => {
  function onChange(value: any) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val: any) {
    console.log("search:", val);
  }
  return (
    <div className={styles.block}>
      <div>
        <strong>Фильтры</strong>
        <Button type='text' icon={<CloseOutlined />} size='large'>
          Очистить
        </Button>
      </div>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Select a person'
        optionFilterProp='children'
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value='jack'>Jack</Option>
        <Option value='lucy'>Lucy</Option>
        <Option value='tom'>Tom</Option>
      </Select>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Select a person'
        optionFilterProp='children'
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value='jack'>Jack</Option>
        <Option value='lucy'>Lucy</Option>
        <Option value='tom'>Tom</Option>
      </Select>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Select a person'
        optionFilterProp='children'
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value='jack'>Jack</Option>
        <Option value='lucy'>Lucy</Option>
        <Option value='tom'>Tom</Option>
      </Select>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Select a person'
        optionFilterProp='children'
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value='jack'>Jack</Option>
        <Option value='lucy'>Lucy</Option>
        <Option value='tom'>Tom</Option>
      </Select>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Select a person'
        optionFilterProp='children'
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value='jack'>Jack</Option>
        <Option value='lucy'>Lucy</Option>
        <Option value='tom'>Tom</Option>
      </Select>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Select a person'
        optionFilterProp='children'
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value='jack'>Jack</Option>
        <Option value='lucy'>Lucy</Option>
        <Option value='tom'>Tom</Option>
      </Select>
      <div>
        <strong>Исключить</strong>
      </div>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Select a person'
        optionFilterProp='children'
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value='jack'>Jack</Option>
        <Option value='lucy'>Lucy</Option>
        <Option value='tom'>Tom</Option>
      </Select>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Select a person'
        optionFilterProp='children'
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value='jack'>Jack</Option>
        <Option value='lucy'>Lucy</Option>
        <Option value='tom'>Tom</Option>
      </Select>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Select a person'
        optionFilterProp='children'
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value='jack'>Jack</Option>
        <Option value='lucy'>Lucy</Option>
        <Option value='tom'>Tom</Option>
      </Select>
    </div>
  );
};

export default Filters;
