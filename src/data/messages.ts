import { LevelInfo, LevelNumber } from '../types/game';

export type ScoreTier = '0-20' | '30-40' | '50-60' | '70-80' | '90-100';

export const ROOMS: LevelInfo[] = [
  {
    level: 1,
    title: 'Room 1: Thói Quen',
    subtitle: 'Sinh hoạt thường ngày',
    category: 'Habits & Routines',
    description: 'Khảo sát những thói quen ăn uống, ngủ nghỉ và giải trí quen thuộc của hai bạn.',
    tag: 'Nhẹ nhàng & Thú vị',
    accentColor: 'from-amber-500/30 via-rose-500/20 to-pink-500/30'
  },
  {
    level: 2,
    title: 'Room 2: Quan Sát',
    subtitle: 'Tiểu tiết & Cử chỉ',
    category: 'Observation & Gestures',
    description: 'Thử tài tinh mắt xem bạn có nhận ra những thói quen vô thức và cử chỉ nhỏ của người ấy.',
    tag: 'Tinh tế & Bất ngờ',
    accentColor: 'from-cyan-500/30 via-teal-500/20 to-emerald-500/30'
  },
  {
    level: 3,
    title: 'Room 3: Quan Điểm',
    subtitle: 'Giá trị sống & Xung đột',
    category: 'Values & Perspectives',
    description: 'Cách nhìn nhận về tài chính, ranh giới cá nhân, gia đình và giải quyết bất đồng.',
    tag: 'Thẳng thắn & Thực tế',
    accentColor: 'from-indigo-500/30 via-purple-500/20 to-pink-500/30'
  },
  {
    level: 4,
    title: 'Room 4: Cảm Xúc',
    subtitle: 'Tổn thương & Vỗ về',
    category: 'Emotions & Vulnerability',
    description: 'Độ nhạy cảm, ngôn ngữ yêu thương, nỗi sợ vô hình và cách sưởi ấm tâm hồn đối phương.',
    tag: 'Sâu lắng & Chân thành',
    accentColor: 'from-rose-500/30 via-pink-500/20 to-red-500/30'
  },
  {
    level: 5,
    title: 'Room 5: Tâm Hồn',
    subtitle: 'Tri kỷ & Đồng điệu tối thượng',
    category: 'Soulmate Connection',
    description: 'Thử thách tối thượng về định mệnh, ước mơ cuộc đời và sự gắn kết vô ngôn qua năm tháng.',
    tag: 'Cực độ kịch tính & Thiêng liêng',
    accentColor: 'from-fuchsia-600/30 via-purple-600/20 to-rose-600/30'
  }
];

export const RESULT_MESSAGES_MATRIX: Record<LevelNumber, Record<ScoreTier, string>> = {
  1: {
    '0-20': 'Ủa hai bạn có chắc là đang quen nhau không? Hay mới đi ghép đôi trên mạng hôm qua?',
    '30-40': 'Thói quen lệch pha như múi giờ London với Tokyo. Chắc chắn cần một khóa huấn luyện thói quen cấp tốc rồi!',
    '50-60': 'Nửa nạc nửa mỡ! Ăn ý vừa đủ để không cãi nhau chuyện tối nay ăn gì, nhưng vẫn còn cơ số bí mật chưa bật mí.',
    '70-80': 'Khá ăn ý rồi đấy! Biết người kia uống trà sữa bao nhiêu % đường, chỉ thiếu nước đoán đúng giờ đi ngủ thôi.',
    '90-100': 'Thần giao cách cảm! Nhìn ánh mắt là biết tối nay ăn gì rồi, không cần tốn nửa lời giải thích!'
  },
  2: {
    '0-20': 'Độ quan sát bằng không! Đối phương đổi kiểu tóc hay đổi gu ăn mặc chắc phải đợi 3 tháng sau bạn mới giật mình nhận ra!',
    '30-40': 'Mắt để ngắm mây ngắm trời chứ chưa ngắm kỹ người yêu rồi. Về nhà ngắm người ta thêm vài chục phút mỗi ngày nhé!',
    '50-60': 'Có chú ý nhưng RAM hay bị đầy. Đoán trúng mấy tật xấu nổi bần bật, còn tiểu tiết đáng yêu thì hay trôi tuột.',
    '70-80': 'Mắt thần tinh tường! Để ý từng cái nhíu mày hay thói quen vô thức nhỏ nhất. Người kia khó lòng mà giấu được điều gì!',
    '90-100': 'Kính hiển vi di động! Đối phương vừa khẽ thở dài là bạn biết ngay đang đói hay đang dỗi. Quá xuất sắc!'
  },
  3: {
    '0-20': 'Quan điểm đối đầu như lửa với nước! Hai bạn mà đi bàn chuyện tương lai chắc phải mời thẩm phán Liên Hợp Quốc về hòa giải!',
    '30-40': 'Hai đường thẳng song song, lâu lâu cắt nhau một tí gọi là có nỗ lực duy trì mối quan hệ.',
    '50-60': 'Bình thường sóng yên biển lặng, nhưng hễ đụng tới chuyện tiền nong hay tương lai là phải vừa đàm phán vừa nín thở.',
    '70-80': 'Khá đấy! Đủ tiêu chuẩn để lên kế hoạch tài chính chung mà không úp mâm vào mặt nhau.',
    '90-100': 'Đồng thanh tương ứng, đồng khí tương cầu! Góc nhìn nhân sinh và tư duy cuộc sống hòa quyện như dùng chung một bộ não.'
  },
  4: {
    '0-20': 'Một người phát tín hiệu radio, một người cầm điện thoại vệ tinh bắt sóng FM. Cần phổ cập ngay bảng mã cảm xúc cấp tốc!',
    '30-40': 'Biết người kia buồn nhưng lúng túng chưa biết dỗ. Nhớ nhé: một cái ôm siết chặt giá trị hơn mười bài thuyết trình đạo lý.',
    '50-60': 'Đã bắt đúng tần số rung cảm cơ bản. Biết khi nào nên nhường một bước và khi nào cần rót một ly nước ấm vỗ về.',
    '70-80': 'Chuyên gia tâm lý riêng của đối phương! Bắt bài trọn vẹn cơn dỗi và luôn có phương thuốc ngọt ngào đúng lúc.',
    '90-100': 'Chạm đáy trái tim! Trái tim người này hơi nhói là người kia thắt lòng. Sự thấu cảm thiêng liêng khiến ai cũng phải ngưỡng mộ.'
  },
  5: {
    '0-20': 'BÁO ĐỘNG ĐỎ! Đề nghị hai đương sự ngồi xuống pha ấm trà và nghiêm túc kiểm điểm lại nhân sinh quan!',
    '30-40': 'Hai mảnh ghép còn hơi chông chênh. Cần thêm nhiều đêm mưa cùng tâm sự dưới ánh nến để thực sự thấu suốt cõi lòng nhau.',
    '50-60': 'Hai tâm hồn đang đồng hành dò tìm nhau giữa vũ trụ bao la. Đi đúng hướng rồi, dũng cảm mở trọn trái tim thêm nữa nào!',
    '70-80': 'Tri kỷ đích thực! Đã tường tận cả những góc khuất sâu kín nhất của nhau mà vẫn kiên định nắm tay không buông.',
    '90-100': 'Đỉnh cao nhân loại! Hai bạn chắc chắn là một linh hồn chia làm hai nửa, vũ trụ cũng phải ghen tị!'
  }
};
