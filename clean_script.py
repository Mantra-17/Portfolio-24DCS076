import sys

with open("generate_pdfs.py", "r", encoding="utf-8") as f:
    text = f.read()

box_replacements = {
    "├──": "|--",
    "└──": "`--",
    "│": "|",
    "─": "-",
    "├": "+",
    "└": "+",
    "┬": "+",
    "┌": "+",
    "┐": "+",
    "┘": "+",
    "┼": "+",
    "…": "...",
    "’": "'",
    "‘": "'",
    "“": '"',
    "”": '"',
}

for k, v in box_replacements.items():
    text = text.replace(k, v)

sanitized = []
for char in text:
    try:
        char.encode("latin-1")
        sanitized.append(char)
    except UnicodeEncodeError:
        sanitized.append(" ")

text = "".join(sanitized)

with open("generate_pdfs.py", "w", encoding="utf-8") as f:
    f.write(text)
print("Sanitized generate_pdfs.py successfully.")
