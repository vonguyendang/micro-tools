import sys
from docx import Document

INPUT_FILE = "NGAN_HANG_CAU_HOI.docx"

def inspect_questions(filename):
    try:
        doc = Document(filename)
    except Exception as e:
        print(f"❌ Không thể đọc file '{filename}': {e}")
        return

    paragraphs = [p for p in doc.paragraphs if p.text.strip()]
    i = 0
    
    print(f"📂 Đang kiểm tra file: {filename}")
    print("-" * 60)

    while i < len(paragraphs):
        text = paragraphs[i].text.strip()
        # Chỉ kiểm tra các câu bị báo lỗi (ví dụ Câu 39 hoặc các câu user báo)
        # Để đơn giản, ta kiểm tra tất cả các câu mà script cũ báo lỗi (không tìm thấy bold)
        
        if text.startswith("Câu "):
            question_text = text
            answers = []
            has_bold = False
            
            # Thu thập 4 đáp án
            current_answers_debug = []
            for j in range(1, 5):
                if i + j >= len(paragraphs): break
                para = paragraphs[i + j]
                
                # Kiểm tra chi tiết từng run trong đáp án
                run_details = []
                is_ans_bold = False
                for idx, run in enumerate(para.runs):
                    # Check bold property
                    b = run.bold
                    # Check font.bold property (sometimes distinct)
                    fb = run.font.bold if run.font else None
                    
                    # Check highlight (background color)
                    highlight = run.font.highlight_color if run.font else None
                    
                    run_info = f"Run {idx}: '{run.text}' (Bold: {b}, Font.Bold: {fb}, Highlight: {highlight})"
                    run_details.append(run_info)
                    
                    if b or fb:
                        is_ans_bold = True

                if is_ans_bold:
                    has_bold = True
                
                current_answers_debug.append({
                    "text": para.text.strip(),
                    "details": run_details,
                    "is_bold": is_ans_bold
                })

            # Nếu không tìm thấy đáp án đúng nào, in ra chi tiết để debug
            if not has_bold and len(current_answers_debug) == 4:
                print(f"❓ {question_text}")
                for ans in current_answers_debug:
                    print(f"   [{'x' if ans['is_bold'] else ' '}] {ans['text']}")
                    for detail in ans['details']:
                        print(f"      -> {detail}")
                print("-" * 60)

            i += 5
        else:
            i += 1

if __name__ == "__main__":
    inspect_questions(INPUT_FILE)
