import SettingSub from '../../../assets/setting-sub.svg';
import SettingAdd from '../../../assets/setting-add.svg';

type Props = {
  text: string;
  value: number;
  onChange: (num: number) => void;
};
const Slippage = ({ text, value, onChange }: Props) => {
  const handleSub = () => {
    if (value > 0) {
      onChange(parseFloat((value - 0.1).toFixed(1)));
    }
  };
  const handleAdd = () => {
    if (value < 100) {
      onChange(parseFloat((value + 0.1).toFixed(1)));
    }
  };
  return (
    <div className="color-black-bg pt-8 pb-8 pr-8 pl-8 mt-16 mb-16">
      <div className="color-white-text text-14 font-500">{text}</div>
      <div className="flex justify-between items-center pt-8">
        <div className="text-20 color-white-text font-700">{value}%</div>
        <div className="flex flex-shrink-0">
          <img
            src={SettingSub}
            alt=""
            onClick={() => {
              handleSub();
            }}
            className="cursor-pointer"
          />
          <img
            src={SettingAdd}
            alt=""
            onClick={() => {
              handleAdd();
            }}
            className="ml-16 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
export default Slippage;
