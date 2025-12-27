// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import Modal from '../Modal/Modal';

const styles = {
  wrapper: css`
    width: 100%;
    display: grid;
  `,
  moduleWrapper: css`
    display: grid;
    grid-template-columns: 100px 1fr;
  `,
};

type Props = {
  modules: Array,
  close: Function,
}
function ModuleDetailModal({
  modules,
  close,
}: Props) {
  return (
    <Modal onClose={close}>
      <div css={styles.wrapper}>
        <h3>模組詳細內容</h3>
        {modules.map(module => (
          <div css={styles.moduleWrapper}>
            <span>{`${module.name}：`}</span>
            <span>{module.content}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default ModuleDetailModal;
