// @flow
/** @jsx jsx */

import {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { jsx, css } from '@emotion/core';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams, Link } from 'react-router-dom';
import ModuleBtn from './ModuleBtn';
import { FORM_STRATEGY_HEADER } from '../../Constant/form';
import { HeaderBlockAllValuesContext } from '../../Constant/context';
import strategyIcon from '../../static/images/icon-strategy.png';
import addIcon from '../../static/images/icon-white-add.png';
import { storeUserModules as storeUserModulesAction } from '../../actions/InvestStrategy';
import { useGlobalMessage } from '../../helper/useGlobalMessage';

const styles = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    margin: '0 0 26px 0',
  },
  title: {
    width: 80,
    height: 80,
    textAlign: 'center',
    lineHeight: '80px',
    color: Colors.PRIMARY,
    margin: '0 20px 0 0',
  },
  modules: {
    position: 'relative',
    display: 'flex',
    height: 80,
    width: 360,
    borderRadius: 40,
    backgroundColor: Colors.LAYER_FIRST,
    transition: '0.5s ease-out',
    fontSize: 13,
    margin: '0 16px 0 0',
  },
  btn: css`
    height: 80px;
    width: 132px;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.LAYER_FIRST};
    color: #FFF;
    font-size: 13px;
  `,
  line: {
    width: 1,
    height: 80,
    backgroundColor: '#707070',
    margin: '0 32px 0 14px',
  },
  icon: {
    height: 24,
    width: 24,
  },
  finishBtn: css`
    opacity: 0;
    bottom: 0;
    background-color: #444444;
  `,
  actived: css`
    opacity: 1;
    transition: opacity 0.5s 1s;
  `,
  circleBtn: css`
    height: 80px;
    width: 80px;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.LAYER_FIRST};
    color: #FFF;
    font-size: 13px;
    margin: 0 32px 0 0;
  `,
  moduleWrapper: {
    display: 'flex',
    position: 'relative',
  },
  deleteBtn: {
    width: 32,
    height: 32,
    position: 'absolute',
    top: 50,
    right: 24,
    backgroundColor: Colors.ERROR,
    borderRadius: 50,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: '32px',
  },
  submitBtn: {
    position: 'absolute',
    borderRadius: 4,
    width: 100,
    height: 40,
    top: 16,
    right: 8,
    fontSize: 14,
    backgroundColor: Colors.PRIMARY,
  },
};

async function submit(
  d, allvalues, stockId, modulesInUsed, modulesNotInUsed, storeUserModules, showMessage
) {
  const updatedUsingModulesInfo = modulesInUsed.map((module, index) => {
    const moduleUsingStockIndex = module.usingStock.findIndex(use => use.companyNumber === stockId);

    return {
      ...module,
      usingStock: [
        ...module.usingStock.slice(0, moduleUsingStockIndex),
        {
          ...module.usingStock[moduleUsingStockIndex],
          rate: allvalues[index],
        },
        ...module.usingStock.slice(moduleUsingStockIndex + 1),
      ],
    };
  });

  const userModulesUpdatedData = [
    ...updatedUsingModulesInfo,
    ...modulesNotInUsed,
  ].sort((cursorA, cursorB) => cursorA.id - cursorB.id);

  // update modules names
  const userModulesUpdatedNames = userModulesUpdatedData.map((module) => {
    const updateNames = Object.entries(d);

    const updateModuleNameIndex = updateNames.findIndex(
      ([id, name]) => module.id === parseInt(id, 10) && name
    );

    if (~updateModuleNameIndex) {
      return {
        ...module,
        name: updateNames[updateModuleNameIndex][1],
      };
    }

    return module;
  });

  const resData = await fetch(`${API_HOST}/modules/updateUserModules`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify({
      stockNumber: stockId,
      stockAlertion: '買',
      userModulesUpdated: userModulesUpdatedNames.map(module => ({
        comment: module.comment,
        headers: module.headers,
        moduleId: module.id,
        mathModule: module.mathModule,
        name: module.name,
        subName: module.subName,
        userId: module.userId,
        usingStock: module.usingStock,
      })),
    }),
  }).then(res => res.json());

  if (resData) {
    const storeResData = resData.map(el => ({
      comment: el.comment,
      headers: el.headers,
      mathModule: el.mathModule,
      id: el.id,
      name: el.name,
      subName: el.subName,
      userId: el.userId,
      usingStock: el.usingStock,
    }));

    storeUserModules(storeResData);

    showMessage('儲存編輯成功');
  }
}

function HeaderBlock({
  modulesInfo,
  storeUserModules,
  handleSubmit,
}: {
  modulesInfo: Array,
  storeUserModules: Function,
  handleSubmit: Function,
}) {
  const [actived, active] = useState(false);
  const [allvalues, setallvalues] = useState([]);
  const [userModules, setUserModules] = useState([]);
  const [modulesInUsed, setModulesInUsed] = useState([]);

  const showMessage = useGlobalMessage();

  const { stockId, industryId } = useParams();

  const onClick = useCallback(() => active(!actived), [actived]);

  const deleteModule = useCallback((id) => {
    const deleteModuleIndex = userModules.findIndex(module => module.id === id);

    setUserModules([
      ...userModules.slice(0, deleteModuleIndex),
      ...userModules.slice(deleteModuleIndex + 1),
    ]);
  }, [userModules]);

  const addUserModules = useCallback(() => {
    const newUserModules = [
      ...userModules,
      {
        id: userModules.length + 1,
        name: '',
        subName: '',
        userId: localStorage.getItem('userId'),
        comment: {
          blocks: [],
        },
        usingStock: [],
        mathModule: {
          content: '',
          chipInfos: [],
        },
        headers: [],
      },
    ];

    setUserModules(newUserModules);
  }, [userModules]);

  const addUserUsingModules = useCallback((id) => {
    const updateModuleIndex = userModules.findIndex(module => module.id === id);

    setUserModules([
      ...userModules.slice(0, updateModuleIndex),
      {
        ...userModules[updateModuleIndex],
        usingStock: [
          ...userModules[updateModuleIndex].usingStock,
          {
            rate: '0',
            companyNumber: parseInt(stockId, 10),
          },
        ],
      },
      ...userModules.slice(updateModuleIndex + 1),
    ]);
  }, [userModules, stockId]);

  const removeUserUsingModules = useCallback((id) => {
    const updateModuleIndex = userModules.findIndex(module => module.id === id);

    setUserModules([
      ...userModules.slice(0, updateModuleIndex),
      {
        ...userModules[updateModuleIndex],
        usingStock: userModules[updateModuleIndex].usingStock
          .filter(el => el.companyNumber !== parseInt(stockId, 10)),
      },
      ...userModules.slice(updateModuleIndex + 1),
    ]);
  }, [userModules, stockId]);

  // InitialValues
  useEffect(() => {
    if (modulesInfo.length) {
      setUserModules(modulesInfo);

      const initValues = modulesInfo.map((el) => {
        const initData = el.usingStock.find(use => use.companyNumber === parseInt(stockId, 10));

        if (initData && initData.rate) {
          return initData.rate;
        }

        return '0';
      });

      setallvalues(initValues);
    }
  }, [modulesInfo, stockId]);

  useEffect(() => {
    const initModulesInUsed = userModules.filter(
      module => module.usingStock.some(use => use.companyNumber === parseInt(stockId, 10))
    );

    setModulesInUsed(initModulesInUsed);
  }, [userModules, stockId]);

  const modulesNotInUsed = useMemo(() => {
    const modulesInUsedSet = new Set(modulesInUsed.map(useModule => useModule.id));

    return userModules.filter(module => !modulesInUsedSet.has(module.id));
  }, [modulesInUsed, userModules]);

  const modulesNotUsingButtons = useMemo(() => {
    if (!modulesNotInUsed.length) return null;

    return modulesNotInUsed.map(module => (
      <div
        key={module.id}
        style={styles.moduleWrapper}>
        <button
          onClick={() => deleteModule(module.id)}
          style={styles.deleteBtn}
          type="button">
          刪除
        </button>
        <button
          css={styles.circleBtn}
          onClick={() => addUserUsingModules(module.id)}
          type="button">
          {module.name}
        </button>
      </div>
    ));
  }, [modulesNotInUsed, addUserUsingModules, deleteModule]);

  const modulesBtns = useMemo(() => {
    if (!modulesInUsed) return null;

    return modulesInUsed.map(module => (
      <ModuleBtn
        key={module.id}
        alertion={module.alertion}
        disabled={!~modulesInfo.findIndex(el => el.id === module.id)}
        name={module.name}
        subName={module.subName}
        id={module.id}
        removeUserUsingModules={removeUserUsingModules}
        actived={actived} />
    ));
  }, [modulesInUsed, actived, removeUserUsingModules, modulesInfo]);

  return (
    <HeaderBlockAllValuesContext.Provider value={[allvalues, setallvalues]}>
      <form css={styles.wrapper}>
        <div css={styles.modules}>
          <span css={styles.title}></span>
          <button
            onClick={onClick}
            type="button"
            css={styles.btn}>
            <img src={strategyIcon} css={[styles.icon, css`margin: 0 20px 0 0;`]} alt="strategy" />
            <span>{actived ? '完成調整' : '調整比重'}</span>
          </button>
          <Link
            to={`/industry/${industryId}/stocks/${stockId}/modules/simulation`}
            css={[styles.btn, css`background-color: #464646;`]}>
            測試績效
          </Link>
        </div>
        {modulesBtns}
        <span css={styles.line} />
        {modulesNotUsingButtons}
        <button
          onClick={addUserModules}
          type="button"
          css={styles.circleBtn}>
          <img src={addIcon} css={styles.icon} alt="Add" />
        </button>
        <button
          style={styles.submitBtn}
          onClick={handleSubmit(d => submit(
            d,
            allvalues,
            parseInt(stockId, 10),
            modulesInUsed,
            modulesNotInUsed,
            storeUserModules,
            showMessage
          ))}
          type="button">
          儲存編輯
        </button>
      </form>
    </HeaderBlockAllValuesContext.Provider>
  );
}

const formHook = reduxForm({
  form: FORM_STRATEGY_HEADER,
});

const reduxHook = connect(
  state => ({
    modulesInfo: state.InvestStrategy.userModulesInfo || [],
  }),
  dispatch => bindActionCreators({
    storeUserModules: storeUserModulesAction,
  }, dispatch),
);

export default reduxHook(formHook(HeaderBlock));
