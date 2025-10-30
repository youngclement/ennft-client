# Challenge — Thử thách thực hành

Put your knowledge to the test with this hands-on challenge designed to reinforce the concepts you've learned in this lesson.

## 🎯 Mục tiêu Challenge

Áp dụng những khái niệm chính trong bài học để giải một bài toán thực tế. Bài tập này sẽ kiểm tra hiểu biết của bạn và giúp bạn có kinh nghiệm thực hành.

Bạn sẽ hoàn thành:

- Thực hiện các khái niệm chính đã học trong bài
- Giải quyết vấn đề thực tế bằng các kỹ thuật đã học
- Minh chứng hiểu biết thông qua việc viết mã
- Nhận phản hồi tức thì cho giải pháp của bạn

## Yêu cầu cụ thể (What you'll accomplish)

1. Cài đặt các chức năng/logic chính tương ứng với nội dung bài học.
2. Viết code sạch, có chú thích (comments) ngắn giải thích phần quan trọng.
3. Cung cấp ví dụ đầu vào/đầu ra (sample input/output) để minh họa.
4. Viết một vài kiểm thử đơn giản (manual hoặc automated) để chứng minh chương trình chạy đúng.

## 💡 Gợi ý & mẹo

- Xem lại nội dung bài nếu cần refresh lý thuyết.
- Đọc kỹ yêu cầu trước khi bắt tay vào code.
- Thử nghiệm nhiều cách tiếp cận nếu cần.
- Sử dụng tài liệu và resources được cung cấp (link, docs) để tra cứu.

## Thời gian ước tính & độ khó

- Thời gian ước tính: 15–30 phút
- Độ khó: Trung cấp (Intermediate)

## Tiêu chí chấm (Acceptance criteria)

- Code chạy được và cho kết quả đúng với các test case mẫu.
- Các trường hợp biên (edge cases) cơ bản được xử lý (ví dụ: input rỗng, giá trị bất thường).
- Cấu trúc mã dễ đọc và có chú thích nếu phần logic phức tạp.

## Hướng dẫn nộp bài / kiểm thử

1. Đặt file mã nguồn và file mô tả (nếu cần) trong một thư mục riêng `challenge/yourname/`.
2. Thêm file `README.md` ngắn trong thư mục mô tả cách chạy (vd: `node index.js`, hoặc `npm test`).
3. Nộp bằng cách đẩy lên branch riêng và tạo Pull Request, hoặc gửi file zip về nơi quy định.

## Ví dụ mẫu (Sample task template)

> Ví dụ bài toán (ví dụ chung): Viết hàm `solve(items)` nhận một danh sách số và trả về tổng của các số nguyên dương, bỏ qua giá trị âm và null.

Sample input:

```json
[1, -2, 3, null, 5]
```

Expected output:

```
9
```

Gợi ý kiểm thử:

- [x] Input rỗng => output `0`
- [x] Tất cả số âm => output `0`
- [x] Hỗn hợp số và `null`/`undefined` => chỉ cộng số dương

## Mẫu checklist nộp bài

- [ ] Source code (đầy đủ)
- [ ] README với hướng dẫn chạy
- [ ] Ít nhất 3 test case (có bao gồm edge cases)
- [ ] Ghi chú (comments) ở phần logic chính

---

Nếu bạn muốn, tôi có thể:

- Chuyển file này vào thư mục `app/elearning/challenges/` hoặc `components/elearning/` để tích hợp trực tiếp vào dự án.
- Sinh template code (JS/TS) cho challenge này.

Bạn muốn tôi đặt file ở đâu? Muốn tôi tạo thêm template code (ví dụ `challenge/index.ts` + `README`)?
