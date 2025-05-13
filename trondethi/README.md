# 📝 Trộn Đề Thi Tự Động từ Word (.docx)

Công cụ Python giúp tạo nhiều mã đề thi từ một file Word chứa ngân hàng câu hỏi, với tính năng:
- Tự động nhận diện đáp án đúng thông qua **chữ in đậm**
- Tùy chọn số đề và số câu mỗi đề
- Trộn thứ tự câu hỏi và đáp án
- Xuất ra file Word cho mỗi mã đề, kèm phần **đáp án ở cuối**

---

## 📁 Cấu trúc thư mục

```
.
├── trondethi.py
├── NGAN_HANG_CAU_HOI.docx     ← 📄 File ngân hàng câu hỏi (bắt buộc)
├── DE_THI_MA_DE_001.docx      ← ✅ Các đề thi đầu ra sẽ xuất hiện tại đây
├── ...
```

---

## 🛠 Yêu cầu

- Python 3.x
- Thư viện Python: `python-docx`

### ✅ Cài đặt thư viện

```bash
pip install python-docx
```

---

## 🧾 Định dạng file `NGAN_HANG_CAU_HOI.docx`

- Câu hỏi bắt đầu bằng: `Câu X. Nội dung câu hỏi?`
- Gồm 4 đáp án (A, B, C, D) ở các dòng tiếp theo.
- **Chỉ đánh dấu đáp án đúng bằng cách in đậm** nội dung dòng đó (dùng chức năng "B" trong Word).

### Ví dụ:

```
Câu 1. Việt Nam là nước gì?
A. Nước xã hội chủ nghĩa
B. Nước quân chủ
C. Nước tư bản
D. Nước quân sự
```

> Đáp án đúng là A → Dòng đó phải được **in đậm**.

---

## ▶️ Cách sử dụng

### 1. Đặt file ngân hàng câu hỏi:
- Đổi tên file Word ngân hàng câu hỏi thành: `NGAN_HANG_CAU_HOI.docx`
- Đặt cùng thư mục với file `trondethi.py`

### 2. Chạy script:
```bash
python trondethi.py
```

### 3. Quá trình chạy:
- Kiểm tra có file ngân hàng hay chưa
- Thông báo số lượng câu hỏi đã phát hiện
- Yêu cầu nhập:
  - Số lượng đề cần tạo (ví dụ: 6)
  - Số câu trong mỗi đề (ví dụ: 40)

---

## 📤 Kết quả đầu ra

- Mỗi đề là một file `.docx` với tên: `DE_THI_MA_DE_001.docx`, `DE_THI_MA_DE_002.docx`, v.v.
- Mỗi đề gồm:
  - Câu hỏi được đánh số từ 1 → N
  - Đáp án A–D (thứ tự bị trộn)
  - Trang cuối là đáp án chuẩn (`ĐÁP ÁN`)

---

## 💡 Gợi ý

- Có thể dùng cho nhiều môn học: chỉ cần đổi nội dung file `NGAN_HANG_CAU_HOI.docx`
- Nếu cần đổi tên đề hoặc tiêu đề, có thể chỉnh dòng này trong code:

```python
title = doc.add_heading(f'ĐỀ THI LUẬT HÀNH CHÍNH - MÃ ĐỀ {code:03}', level=1)
```

---

## 🧑‍💻 Tác giả
VO NGUYEN DANG
> Công cụ dành cho giáo viên, giảng viên, trợ lý học vụ cần tự động hóa việc trộn đề thi từ Word!
