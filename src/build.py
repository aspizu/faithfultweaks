from __future__ import annotations

import subprocess
from pathlib import Path

import msgspec
from rich import print


def export_typescript[T](type: T) -> T:
    print(f"[bold]Exporting type:[/bold] {type.__name__}")
    schema = msgspec.json.schema(type)
    schema = {
        "allOf": [{"$ref": schema["$ref"]}],
        "$defs": schema["$defs"],
    }
    subprocess.run(
        [
            "powershell.exe",
            "npx",
            "json2ts",
            "--output",
            f"src/types/{type.__name__}.d.ts",
        ],
        input=msgspec.json.encode(schema),
    )
    return type


class Author(msgspec.Struct):
    discord: str | None = None
    github: str | None = None
    email: str | None = None
    link: str | None = None


class TweakData(msgspec.Struct):
    title: str
    description: str
    author: Author
    category: str
    version: str


class Tweak(msgspec.Struct):
    data: TweakData
    files: list[str]
    x64support: bool


@export_typescript
class Data(msgspec.Struct):
    customOptionsBackgrounds: list[str]
    tweaks: dict[str, Tweak]


data: Data = Data(["dirt", "stone"], {})

for dir in Path("public/tweaks").iterdir():
    if not dir.is_dir():
        continue
    print(f"[bold]Building index for tweak directory: {dir}[/]")
    tweak = Tweak(
        data=msgspec.json.decode((dir / "tweak.json").read_text(), type=TweakData),
        files=[
            i.relative_to(dir / "x32/assets").as_posix()
            for i in dir.glob("x32/assets/**/*")
            if i.is_file()
        ],
        x64support=(dir / "x64").is_dir(),
    )
    data.tweaks[dir.name] = tweak


# data = Data(
#     [
#         "dirt",
#         "stone",
#         # file.stem
#         # for file in Path("public/x32/assets/minecraft/textures/block").iterdir()
#     ],
#     {
#         dir.name: Tweak(
#             msgspec.json.decode((dir / "tweak.json").read_text(), type=TweakData),
#             [
#                 i.relative_to(dir / "x32/assets").as_posix()
#                 for i in dir.glob("x32/assets/**/*")
#                 if i.is_file()
#             ],
#             [
#                 i.relative_to(dir / "x32/preview").as_posix()
#                 for i in dir.glob("x32/preview/**/*")
#                 if i.is_file()
#             ],
#             x64support=(dir / "x64").is_dir(),
#         )
#         for dir in Path("public/tweaks").iterdir()
#         if dir.is_dir()
#     },
# )

with open("public/data.json", "wb") as data_file:
    data_file.write(msgspec.json.encode(data))
