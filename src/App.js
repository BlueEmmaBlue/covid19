import { PageHeader, Menu } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import "./App.css";
import Global from "./Global";
import Country from "./Country";

const App = (props) => {
  const {
    globalAddOptions,
    globalCakeOptions,
    globalSumOptions,
    globalCountriesList,
    getGlobalAddOptions,
    getGlobalCakeOptions,
    getGlobalSumOptions,
    getGlobalCountriesList,
    currentCountry,
    options,
    countryAddOptions,
    countrySumOptions,
    countryLineOptions,
    getSelectedOptions,
    getCountryLineOptions,
    getCountryAddOptions,
    getCountrySumOptions,
    updateState
  } = props;

  useEffect(() => {
    getGlobalAddOptions();
    getGlobalCakeOptions();
    getGlobalSumOptions();
    getGlobalCountriesList();
    getSelectedOptions();
  }, []);


  useEffect(() => {
    getCountryLineOptions(currentCountry);
    getCountryAddOptions(currentCountry);
    getCountrySumOptions(currentCountry);
  }, [currentCountry])

  const [globalVisible, setGlobalVisible] = useState(true);
  const [current, setCurrent] = useState("1");

  const LeftMenu = () => {
    return (
      <Menu style={{ width: 256 }} selectedKeys={[current]}>
        <Menu.Item
          key="1"
          icon={<MailOutlined />}
          onClick={(e) => {
            setGlobalVisible(true);
            setCurrent(e.key);
          }}
        >
          全球疫情数据
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<AppstoreOutlined />}
          onClick={(e) => {
            setGlobalVisible(false);
            setCurrent(e.key);
          }}
        >
          各国疫情数据
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <div className="App">
      <PageHeader
        className="site-page-header"
        title="疫情数据可视化"
        subTitle="from 大数据小分队"
      />
      <div className="main-wrapper">
        <LeftMenu />
        {globalVisible ? <Global globalAddOptions={globalAddOptions} globalCakeOptions={globalCakeOptions} globalSumOptions={globalSumOptions} globalCountriesList={globalCountriesList} /> : <Country options={options} countryAddOptions={countryAddOptions} countrySumOptions={countrySumOptions} countryLineOptions={countryLineOptions} updateState={updateState} currentCountry={currentCountry} />}
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    globalAddOptions: state.covid.globalAddOptions,
    globalCakeOptions: state.covid.globalCakeOptions,
    globalSumOptions: state.covid.globalSumOptions,
    globalCountriesList: state.covid.globalCountriesList,
    currentCountry: state.covid.currentCountry,
    options: state.covid.options,
    countryAddOptions: state.covid.countryAddOptions,
    countrySumOptions: state.covid.countrySumOptions,
    countryLineOptions: state.covid.countryLineOptions,
  }
}

const mapDispatch = dispatch => ({
  getGlobalAddOptions: () => dispatch.covid.getGlobalAddOptions(),
  getGlobalCakeOptions: () => dispatch.covid.getGlobalCakeOptions(),
  getGlobalSumOptions: () => dispatch.covid.getGlobalSumOptions(),
  getGlobalCountriesList: () => dispatch.covid.getGlobalCountriesList(),
  getSelectedOptions: () => dispatch.covid.getSelectedOptions(),
  getCountryLineOptions: (currentCountry) => dispatch.covid.getCountryLineOptions(currentCountry),
  getCountryAddOptions: (currentCountry) => dispatch.covid.getCountryAddOptions(currentCountry),
  getCountrySumOptions: (currentCountry) => dispatch.covid.getCountrySumOptions(currentCountry),
  updateState: (id, payload) => dispatch.covid.updateState(id, payload)
})

export default connect(mapState, mapDispatch)(App);
