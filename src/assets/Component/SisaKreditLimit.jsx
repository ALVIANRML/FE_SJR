import { Col } from "antd";
import { createStyles } from "antd-style";
 
const useStyles = createStyles(({ css }) => ({
  box: css`
    padding: 14px 16px;
    height: 100%;
    border-bottom: 1px solid #e6e9f0;
    @media (min-width: 576px) {
      border-bottom: none;
      border-right: 1px solid #e6e9f0;
      padding: 16px 20px;
    }
  `,
  last: css`
    border-bottom: none;
    @media (min-width: 576px) {
      border-right: none;
    }
  `,
  label: css`
    margin: 0 0 4px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: #8a90a0;
  `,
  value: css`
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #182b55;
    white-space: nowrap;
  `,
}));
 
export default function SisaKreditLimit({
  Bagian,
  Nilai = "Rp 5.000.000.000",
  last = false,
}) {
  const { styles, cx } = useStyles();
  return (
    <Col xs={24} sm={8}>
      <div className={cx(styles.box, last && styles.last)}>
        <p className={styles.label}>{Bagian}</p>
        <p className={styles.value}>{Nilai}</p>
      </div>
    </Col>
  );
}
 