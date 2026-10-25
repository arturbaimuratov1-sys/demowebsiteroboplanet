# ROLLBACK — возврат к предыдущим версиям

## Актуальная копия (v3, перед v4)
`C:\roboaktobe\backup-2026-10-25\` — полные исходники v3. Скриншоты v3: `compare-after/`, `qa2/` (файлы до `v4*`).

## Старые копии
`C:\roboaktobe\backup-v2\` (v2), `C:\roboaktobe\backup-v1\` (v1).

## Как откатить всё целиком
Старый вариант перезаписывает новый, удаление только скопированных файлов:
```
node -e "const fs=require('fs'),p=require('path');const S='C:\\roboaktobe\\backup-v2',D='C:\\roboaktobe';(function c(s,d){for(const e of fs.readdirSync(s,{withFileTypes:true})){const a=p.join(s,e.name),b=p.join(d,e.name);if(e.isDirectory()){fs.mkdirSync(b,{recursive:true});c(a,b)}else fs.copyFileSync(a,b)}})(S,D);console.log('restored from backup-v2')"
```
После этого удалить файлы, которых не было в v2: `CHANGELOG-VISUAL.md`, `ROLLBACK.md`, `compare-before/`, `compare-after/` (если созданы).

## Как откатить один файл
Взять исходник из той же структуры внутри `backup-v2/`, скопировать поверх.
Пример для стилей: `backup-v2\assets\css\style.css` → `assets\css\style.css`.

## Важно
- Git-репозитория в проекте нет, поэтому откат только копированием. Нечего сбрасывать через git.
- Не удаляйте каталоги `backup-v1` и `backup-v2` до приёмки работы владельцем.
- Незакоммиченных изменений в смысле Git нет; все правки — обычные файлы.
- Секреты в проекте не используются; при откате их трогать не нужно.
