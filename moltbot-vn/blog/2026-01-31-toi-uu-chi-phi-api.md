---
slug: toi-uu-chi-phi-api-claude-gpt
title: Cách tối ưu chi phí API khi dùng Claude/GPT - Tiết kiệm 50% mỗi tháng
authors: [moltbot-vn]
tags: [tips, cost-optimization, api, intermediate]
description: Hướng dẫn chi tiết cách giảm chi phí API Claude/GPT khi dùng Moltbot. 7 mẹo thực tế giúp tiết kiệm từ 30-50% mỗi tháng mà không giảm chất lượng.
keywords: [tiết kiệm chi phí api, claude api pricing, gpt api cost, moltbot cost optimization]
---

# Cách tối ưu chi phí API khi dùng Claude/GPT

Một trong những lo ngại lớn nhất khi dùng AI Agent như Moltbot là **chi phí API**. Nhiều người bắt đầu hào hứng, nhưng sau 1 tháng nhìn hóa đơn Anthropic/OpenAI thì... *"Ơ kìa, sao nhiều thế?"*

Bài viết này sẽ giúp bạn **giảm 30-50% chi phí** mà vẫn giữ được hiệu quả làm việc của Bot.

<!--truncate-->

## 💰 Hiểu về cách tính phí API

Trước khi tối ưu, bạn cần hiểu cách các nhà cung cấp tính tiền:

### Claude (Anthropic)

| Model | Input | Output |
|-------|-------|--------|
| Claude 3.5 Sonnet | $3/1M tokens | $15/1M tokens |
| Claude 3 Haiku | $0.25/1M tokens | $1.25/1M tokens |
| Claude 3 Opus | $15/1M tokens | $75/1M tokens |

### GPT (OpenAI)

| Model | Input | Output |
|-------|-------|--------|
| GPT-4o | $5/1M tokens | $15/1M tokens |
| GPT-4o-mini | $0.15/1M tokens | $0.60/1M tokens |
| GPT-4 Turbo | $10/1M tokens | $30/1M tokens |

:::tip[Nhận ra điều gì chưa?]
**Output đắt hơn Input từ 3-5 lần!**

Vì vậy, mẹo số 1 là: **Giảm lượng output mà Bot tạo ra.**
:::

---

## 🎯 7 Mẹo Tối Ưu Chi Phí Thực Tế

### 1. Chọn đúng Model cho đúng việc

**Nguyên tắc vàng:**
- 🏃 **Tác vụ đơn giản** (trả lời nhanh, format text): Dùng **Haiku** hoặc **GPT-4o-mini**
- 🧠 **Tác vụ phức tạp** (code, phân tích, planning): Dùng **Sonnet** hoặc **GPT-4o**
- 🎓 **Tác vụ cực khó** (nghiên cứu sâu, creative): Mới dùng **Opus** hoặc **GPT-4**

**Cách cấu hình trong Moltbot:**

```json
{
  "agents": {
    "list": [
      {
        "id": "quick-helper",
        "model": "claude-3-haiku-20240307",
        "description": "Trả lời nhanh, việc đơn giản"
      },
      {
        "id": "main",
        "model": "claude-3-5-sonnet-20241022",
        "description": "Agent chính cho việc phức tạp"
      }
    ]
  }
}
```

**Tiết kiệm:** Haiku rẻ hơn Sonnet **12 lần**!

---

### 2. Giới hạn độ dài Output

Bot hay có xu hướng "nói nhiều". Bạn có thể giới hạn bằng cách thêm instruction:

```json
{
  "agents": {
    "defaults": {
      "systemPrompt": "Trả lời ngắn gọn, súc tích. Tối đa 200 từ mỗi câu trả lời trừ khi user yêu cầu chi tiết."
    }
  }
}
```

Hoặc trong từng tin nhắn:
> *"Tóm tắt ngắn gọn trong 3 bullet points"*

**Tiết kiệm:** Giảm 40-60% token output

---

### 3. Tắt các tool không dùng

Mỗi khi Bot được cấp một tool, hệ thống phải gửi mô tả tool đó trong prompt (tốn input tokens). Nếu bạn không dùng Browser hoặc Web Search, hãy tắt đi:

```json
{
  "tools": {
    "browser": {
      "enabled": false
    },
    "web": {
      "search": {
        "enabled": false
      }
    }
  }
}
```

**Tiết kiệm:** 500-2000 tokens mỗi lần gọi API

---

### 4. Sử dụng Caching thông minh

Moltbot có tính năng cache kết quả. Nếu bạn hỏi cùng 1 câu trong vòng 15 phút, nó sẽ không gọi API lại.

**Tăng thời gian cache:**

```json
{
  "gateway": {
    "cache": {
      "ttl": 3600,  // 1 giờ thay vì 15 phút
      "enabled": true
    }
  }
}
```

**Tiết kiệm:** 20-30% cho các tác vụ lặp lại

---

### 5. Dọn dẹp Context thường xuyên

Mỗi tin nhắn mới, Moltbot gửi cả **lịch sử hội thoại** lên API. Hội thoại càng dài, token càng nhiều.

**Giải pháp:**
1. Bắt đầu chat mới khi chuyển sang topic khác
2. Giới hạn context length:

```json
{
  "agents": {
    "defaults": {
      "contextLimit": 20  // Chỉ giữ 20 tin nhắn gần nhất
    }
  }
}
```

**Tiết kiệm:** 50%+ cho các phiên chat dài

---

### 6. Batch các tác vụ nhỏ

Thay vì:
```
Bạn: Tóm tắt file1.txt
Bot: ...
Bạn: Tóm tắt file2.txt
Bot: ...
Bạn: Tóm tắt file3.txt
Bot: ...
```

Hãy gộp lại:
```
Bạn: Tóm tắt 3 file sau: file1.txt, file2.txt, file3.txt. Mỗi file 1 bullet point.
Bot: ...
```

**Tiết kiệm:** 60-70% cho tác vụ lặp

---

### 7. Monitor chi phí thường xuyên

**Với Anthropic:**
- Vào: [console.anthropic.com](https://console.anthropic.com)
- Xem mục "Usage"
- Đặt alert khi vượt ngưỡng

**Với OpenAI:**
- Vào: [platform.openai.com/usage](https://platform.openai.com/usage)
- Set "Usage limits" để không bị charge quá

**Trong Moltbot:**
```bash
moltbot logs --filter api --since 24h | grep "tokens"
```

---

## 📊 Case Study: Tiết kiệm từ $80 xuống $35/tháng

**Trước khi tối ưu:**
- Model: Claude 3.5 Sonnet cho mọi việc
- Context: Không giới hạn
- Tools: Tất cả enabled
- Chi phí: ~$80/tháng

**Sau khi tối ưu:**
- Model: Haiku cho việc đơn giản, Sonnet cho việc khó
- Context: Limit 20 messages
- Tools: Chỉ enable những gì cần
- Cache: 1 giờ
- Chi phí: ~$35/tháng

**Kết quả: Giảm 56%!**

---

## ⚠️ Cảnh báo: Đừng tối ưu quá đà

- ❌ **Đừng** dùng model quá yếu cho việc phức tạp → Bot sẽ làm sai, tốn thời gian sửa
- ❌ **Đừng** cắt context quá ngắn → Bot quên ngữ cảnh, trả lời lạc đề
- ❌ **Đừng** tắt hết tools → Bot mất khả năng hành động

**Nguyên tắc:** Tiết kiệm tiền nhưng **không hy sinh hiệu quả công việc**.

---

## 🎁 Bonus: Script tính chi phí ước lượng

Lưu file này và chạy để ước lượng chi phí hàng tháng:

```python
# cost_estimator.py
def estimate_monthly_cost(
    messages_per_day: int,
    avg_input_tokens: int = 500,
    avg_output_tokens: int = 300,
    model: str = "sonnet"
):
    models = {
        "sonnet": {"input": 3, "output": 15},
        "haiku": {"input": 0.25, "output": 1.25},
        "gpt4o": {"input": 5, "output": 15},
        "gpt4o-mini": {"input": 0.15, "output": 0.60}
    }
    
    rate = models.get(model, models["sonnet"])
    
    daily_input = messages_per_day * avg_input_tokens
    daily_output = messages_per_day * avg_output_tokens
    
    monthly_input = daily_input * 30 / 1_000_000 * rate["input"]
    monthly_output = daily_output * 30 / 1_000_000 * rate["output"]
    
    total = monthly_input + monthly_output
    
    print(f"Model: {model}")
    print(f"Messages/day: {messages_per_day}")
    print(f"Estimated monthly cost: ${total:.2f}")
    return total

# Ví dụ: 50 tin nhắn/ngày với Sonnet
estimate_monthly_cost(50, model="sonnet")

# So sánh với Haiku
estimate_monthly_cost(50, model="haiku")
```

---

## Kết luận

Tối ưu chi phí API không khó, chỉ cần:

1. ✅ Chọn đúng model cho đúng việc
2. ✅ Giới hạn output length
3. ✅ Tắt tools không cần thiết
4. ✅ Bật cache
5. ✅ Dọn context thường xuyên
6. ✅ Batch tác vụ lặp
7. ✅ Monitor chi phí

Với 7 mẹo này, bạn hoàn toàn có thể **giảm 30-50% chi phí** mà vẫn có một AI Agent hoạt động hiệu quả.

---

## Đọc thêm

- [Cấu hình Gateway chi tiết](/docs/gateway/configuration)
- [Multi-Agent: Chia tải cho nhiều Bot](/docs/concepts/multi-agent)
- [Best Practices bảo mật](/docs/security/best-practices)

---

**Bạn có mẹo tiết kiệm nào khác không?** Chia sẻ trong [Discord](https://discord.gg/moltbot-vn) hoặc [Telegram](https://t.me/moltbotvn) nhé!
