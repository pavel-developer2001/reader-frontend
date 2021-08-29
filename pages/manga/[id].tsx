import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { Button, Image, Tag } from "antd";
import { Select } from "antd";
import { Typography, Divider } from "antd";
import { Tabs } from "antd";
import styles from "./Manga.module.css";
import CommentsBlock from "../../components/CommentsBlock";
import { PlusOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const { Title, Paragraph, Text, Link } = Typography;

const PageManga = () => {
  const { Option } = Select;

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
  function callback(key: string) {
    console.log(key);
  }
  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <Image
            width={250}
            height={350}
            src='https://api.remanga.org//media/titles/extraordinary-evolutin/74a7f479e93ac92506d509b2a2ecd1ee.jpg'
          />
          <Button type='primary' shape='round' size='large'>
            Читать
          </Button>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder='Добавить в закладки'
            optionFilterProp='children'
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value='read1'>Читаю</Option>
            <Option value='read2'>Прочитано</Option>
            <Option value='read3'>Буду читать</Option>
            <Option value='read4'>Брошено</Option>
            <Option value='read5'>Неинтересно</Option>
            <Option value='read6'>Отложено</Option>
          </Select>
          <Button type='link'>Редактировать</Button>
          <Button type='primary' icon={<PlusOutlined />} size='large'>
            Добавить новые главы
          </Button>
        </div>
        <div>
          <div>
            <div>
              <Title>Эволюция сильнейшего мага</Title>
              <Title level={5}>
                The evolution of the strongest magician / 超凡进化
              </Title>
            </div>
            <div>8.9 (голосов: 610) 17.2K 95.4K 13.8K Маньхуа 2021</div>
          </div>
          <div className={styles.table}>
            <div>
              <Tabs defaultActiveKey='1' onChange={callback}>
                <TabPane tab='Описание' key='1'>
                  <Tag color='purple'>purple</Tag>
                  <Tag color='purple'>purple</Tag>
                  <Tag color='purple'>purple</Tag>
                  <Tag color='purple'>purple</Tag>
                  <Tag color='purple'>purple</Tag>
                  <Tag color='purple'>purple</Tag>
                  <Tag color='purple'>purple</Tag>
                  <Tag color='purple'>purple</Tag>
                  <p>
                    {" "}
                    Мин Хе - молодой парень со скрытым потенциалом. Его
                    потенциал - полный мусор. Буквально белая пыль, которую
                    легко можно развеить на ветру. Рассекая дорогу домой на
                    своем мотоцикле, он замечает над своей головой падающую
                    комету. Катастрофу, которая носит кодовое имя "Божья кара".
                    Она падает прямиком на него, от чего тот падает в обморок на
                    целый год, но за это время, будучи наедине со своей убийцей,
                    он получает великую силу, и его мусорный талант становится
                    поистине великим. Шаг за шагом, он становится сильнейшим и
                    приближается к разгадке тайны "Божьей кары".
                  </p>
                  <CommentsBlock />
                </TabPane>
                <TabPane tab='Главы' key='2'>
                  Content of Tab Pane 2
                </TabPane>
              </Tabs>
            </div>
            <div className={styles.addition}>
              <div>Переводчики</div>
              <div>Похожее</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PageManga;
