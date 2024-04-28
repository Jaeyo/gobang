import './control.css';
import { useDispatch, useSelector } from 'react-redux';
import { startGame, endGame, undoMove, setAiFirst, setDepth, setIndex } from '../store/gameSlice';
import { board_size } from '../config';
import { Button, Switch, Select } from 'antd';
import { STATUS } from '../status';
import { useCallback } from 'react';

function Control() {
  const dispatch = useDispatch();
  const { loading, winner, status, history, aiFirst, depth, index, score, path, currentDepth } = useSelector((state) => state.game);
  const start = useCallback(() => {
    dispatch(startGame({board_size, aiFirst, depth}));
  }, [dispatch, board_size, aiFirst, depth]);
  const end = useCallback(() => {
    dispatch(endGame());
  }, [dispatch]);
  const undo = useCallback(() => {
    dispatch(undoMove());
  }, [dispatch]);
  const onFirstChange = useCallback((checked) => {
    dispatch(setAiFirst(checked));
  }, [dispatch]);
  const onDepthChange = useCallback((value) => {
    dispatch(setDepth(value));
  }, [dispatch]);
  const onIndexChange = useCallback((checked) => {
    dispatch(setIndex(checked));
  }, [dispatch]);
  return (
    <div className="controle">
      <div className="buttons">
        <Button className="button" type="primary" onClick={start} disabled={loading || status !== STATUS.IDLE}>start</Button>
        <Button className="button" type="primary" onClick={undo} disabled={loading || status !== STATUS.GAMING || history.length === 0}>go back</Button>
        <Button className="button" type="primary" onClick={end} disabled={loading || status !== STATUS.GAMING}>lose</Button>
      </div>
      <div className="setting">
        <div className="setting-item">
          computer first: <Switch defaultChecked={aiFirst} onChange={onFirstChange} disabled={loading} />
        </div>
        <div className="setting-item">
          difficulty:
          <Select
            defaultValue={String(depth)}
            style={{ width: 80 }}
            onChange={onDepthChange}
            disabled={loading}
            options={[
              { value: '2', label: 'easy' },
              { value: '4', label: 'normal' },
              { value: '6', label: 'difficult' },
              { value: '8', label: 'hell' },
            ]}
          />
        </div>
        <div className="setting-item">
          show index: <Switch defaultChecked={index} onChange={onIndexChange} />
        </div>
      </div>
      <div className="status">
        <div className="status-item">score：{score}</div>
        <div className="status-item">current depth: {currentDepth}</div>
        <div className="status-item">path: {JSON.stringify(path)}</div>
        <div className="status-item">history: {JSON.stringify(history.map(h => [h.i, h.j]))}</div>
      </div>
    </div>
  );
}

export default Control;
