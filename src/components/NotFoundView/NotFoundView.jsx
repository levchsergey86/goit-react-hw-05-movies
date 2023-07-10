import s from './NotFoundView.module.css';

export default function NotFoundView() {
  return (
    <div className={s.NotFoundViewBox}>
      <p className={s.NotFoundViewText}>PAGE NOT FOUND :(</p>
    </div>
  );
}
