// @flow

import React, {
  useContext,
  useMemo,
  useState,
} from 'react';
import { ModuleDataContext } from '../../../Constant/context';
import ModuleTableColumnBoard from './ModuleTableColumnBoard';
import editIcon from '../../../static/images/icon-edit.png';
import ChipHeaderUpdateBlock from './ChipHeaderUpdateBlock';

const styles = {
  wrapper: {
    width: '100%',
    padding: 16,
    backgroundColor: Colors.LAYER_FIRST,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'auto',
    maxWidth: '100%',
    borderRadius: 22,
  },
  dateSideHeaderWrapper: {
    flexBasis: 140,
    flexShrink: 0,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.LAYER_FOURTH,
    borderRadius: 16,
  },
  addBtn: {
    flexBasis: 140,
    height: 100,
    padding: 0,
    fontSize: 13,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  editBtnImg: {
    width: 18,
  },
  dateBlockHeader: {
    height: 100,
    margin: '0 0 10px 0',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 20px',
  },
  horizontalLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFF',
  },
  dateBlock: {
    height: 100,
    margin: '0 0 10px 0',
    textAlign: 'center',
    lineHeight: '100px',
  },
};

function ModuleTable() {
  const [isHeaderUpdateBlockOpen, setHeaderUpdateBlockOpen] = useState(false);
  const moduleData = useContext(ModuleDataContext);

  const dateSideHeader = useMemo(() => {
    if (!moduleData.length) return null;

    const dateList = [];

    dateList.push(
      <div
        key="header"
        style={styles.dateBlockHeader}>
        <span>資料：單季</span>
        <div style={styles.horizontalLine} />
        <span>時間列表</span>
      </div>
    );

    moduleData[0].chipData.forEach(({ date }) => {
      dateList.push(
        <span
          key={date}
          style={styles.dateBlock}>
          {date}
          季
        </span>
      );
    });

    return (
      <div style={styles.dateSideHeaderWrapper}>
        {dateList}
      </div>
    );
  }, [moduleData]);

  const moduleMainBlock = useMemo(() => {
    if (!moduleData) return null;

    return (
      <>
        {moduleData.map((elem, id) => (
          <ModuleTableColumnBoard
            key={elem.id}
            columnId={id}
            elem={elem} />
        ))}
      </>
    );
  }, [moduleData]);

  return (
    <div style={styles.wrapper}>
      {dateSideHeader}
      {moduleMainBlock}
      <button
        onClick={() => setHeaderUpdateBlockOpen(true)}
        style={styles.addBtn}
        type="button">
        <img src={editIcon} alt="add" style={styles.editBtnImg} />
      </button>
      <ChipHeaderUpdateBlock
        isOpen={isHeaderUpdateBlockOpen}
        setOpen={setHeaderUpdateBlockOpen} />
    </div>
  );
}

export default ModuleTable;
